import { Elysia, t } from 'elysia';
import Html, { html } from '@elysiajs/html';
import Counter from '../../components/counter/Counter';
import { Index } from '../../components/counter';
import { staticPlugin } from '@elysiajs/static';
import Layout from '../../layout/layout';
import Home from '../../components/Home';

/////////////  Counter  ////////////////////////////////
// The task is to build a frame containing             /
// a label or read-only textfield T and a button B.    /
// Initially, the value in T is “0”                    /
// and each click of B increases the value in T by one./
////////////////////////////////////////////////////////


//////// Validation ////////////
const count = t.Number()
export type CNT = typeof count.static 

class Count {
    constructor(
        public count: CNT = 0
    ) {}

    increment() {
        this.count+=1
        return this.count
    }
}

export const getCounter= new Elysia(({ name: 'counter/task'}))
    .use(html())
    .use(staticPlugin())
    .decorate('counter', new Count())
    .get('/', () => {
        return (
            <Layout title='counter'>
                <Home title='counter'>
                    <Counter count={'counter'} />
                </Home>
            </Layout>
        );
    })
    .post('/increment', ({counter})=> {
        const newCount = counter.increment();
        return newCount;
    })