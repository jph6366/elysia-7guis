
import { Elysia, t } from 'elysia'



export const userService = new Elysia({ name: 'user/service' }) 
	.state({                  // ##### The name property here is very important, 
        user: {} as Record<string, string>, // #### as it's a unique identifier for the plugin to prevent duplicate instances (like a singleton). 
        session: {} as Record<number, string> 
    }) 
    .model({ 
        signIn: t.Object({ 
            username: t.String({ minLength: 1 }), 
            password: t.String({ minLength: 8 }) 
        }), 
        session: t.Cookie( 
            { 
                token: t.Number() 
            }, 
            { 
                secrets: 'seia'
            } 
        ), 
        optionalSession: t.Optional(t.Ref('session')) 
    })
    .macro({
        isSignIn(enabled: boolean) {
            if (!enabled) return

            return {
                beforeHandle({error, cookie:{token}, store:{session}}) {
                    if (!token.value)
                        return error(401, {
                            success: false,
                            message: 'Unauthorized'
                        })
                    const username = session[token.value as unknown as number]
                    if(!username)
                        return error(401, {
                            success: false,
                            message: 'Unauthorized'
                        })
                }
            }
        }
    })

export const getUserId = new Elysia() 
    .use(userService) // ### We don't define a name in this getUserId instance 
    .guard({  // #####  because we want guard and resolve to reapply into multiple instances.
    	// as: 'scoped', 
        isSignIn: true,
        cookie: 'session'
    }) 
    .resolve(    	
        // { as: 'scoped' }, 
        ({ store: { session }, cookie: { token } }) => ({ 
        username: session[token.value] // resolve defines a new property into the same context as store but only executes it per request
    })) // ##### Unlike decorate and store, resolve is defined at the beforeHandle stage or the value will be available after validation.
// ####  we define a new property username by using resolve, allowing us to reduce the getting username logic into a property instead
    .as('scoped')
export const user = new Elysia({ prefix: '/user'})
	.use(getUserId) 
    // .state({                    ######## Plugin De-duplication
    //     user: {} as Record<string, string>,
    //     session: {} as Record<number, string>

    // })
    // .model({    // #### Reference model
    // 	signIn: t.Object({ 
    // 		username: t.String({ minLength: 1 }), 
    // 		password: t.String({ minLength: 8 }) 
    // 	}), 
    //  	session: t.Cookie( 
	//      	{ 
	//      		token: t.Number() 
	//      	}, 
	//      	{ 
	// 	     	secrets: 'seia'
	//      	} 
	//     ), 
    //   	optionalSession: t.Optional(t.Ref('session')) 
    // }) 
    .put(
        '/sign-up',
        async ({ body: {username, password}, store, error}) => {
            if(store.user[username])
                return error(400, {
                    success: false,
                    message: 'User already exists'
                })
            store.user[username] = await Bun.password.hash(password)
            return {
                success: true,
                message: 'User created'
            }
        },
        {
            // body: t.Object({                        ### Instead of copy-pasting the model all over the place, 
            //     username: t.String({minLength: 1}),####  we could use a reference model to reuse the model by specifying a name.
            //     password: t.String({minLength: 8})
            // })
            body: 'signIn'
        }
    )
    .post(
        '/sign-in',
        async ({
            store: { user, session},
            error,
            body: { username, password },
            cookie: { token }
        }) => {
            if (
                !user[username] ||
                !(await Bun.password.verify(password, user[username]))
            )
                return error(400, {
                    succcess: false,
                    message: 'Invalid userename or password'
                })
            const key = crypto.getRandomValues(new Uint32Array(1))[0]
            session[key] = username
            token.value = key
            return {
                success: true,
                message: `signed in as ${username}`
            }
        },
        {
            // body: t.Object({
            //     username: t.String({minLength: 1}),
            //     password: t.String({minLength: 8})
            // }),
            // cookie: t.Cookie(
            //     {
            //         token: t.Number()
            //     },
            //     {
            //         secrets: 'seia'
            //     }
            // )
            body: 'signIn',
            cookie: 'session'
        }
    )
    .get( 
        '/sign-out', 
        ({ cookie: { token } }) => { 
            token.remove() 
            return { 
                success: true, 
                message: 'Signed out'
            } 
        }, 
        { 
            cookie: 'optionalSession'
        } 
    ) 
    .get( 
        '/profile', 
        ({ username })=> ({
            succes: true,
            username
        })
        // ({ cookie: { token }, store: { session }, error }) => { 
        //     const username = session[token.value] 
        //     // if (!username)           ### replaced by macro custom onBeforeHandle event
        //     //     return error(401, { 
        //     //         success: false, 
        //     //         message: 'Unauthorized'
        //     //     }) 
        //     return { 
        //         success: true, 
        //         username 
        //     } 
        // }, 
        // { 
        //     isSignIn: true,
        //     cookie: 'session'
        // } 
    ) 