import Html from '@elysiajs/html';

export default function Counter(count: any) {
    return (
            <div>
                <h1>Counter</h1>
                <div id="count">${count}</div>
                <button hx-post="/increment" hx-target="#count"
                        hx-swap="innerHTML">
                            Increment
                </button>
            </div>
    )
}