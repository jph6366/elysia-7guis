import Html, { html } from '@elysiajs/html';

export type LayoutType = {
  title?: string
  children?: JSX.Element
}

export default function Layout({ title, children }: LayoutType) {
    return (
    <>  
        {'<!doctype html>'}
        <html lang="en">
            <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />

            <script src="https://unpkg.com/htmx.org"></script>
            {/* <link rel="stylesheet" href="/public/styles.css" /> */}

            <title>Elysia {title}</title>
            </head>

            <body class="c content">
                {children as 'safe'}        
            </body>
        </html>      
    </>  
    )
}