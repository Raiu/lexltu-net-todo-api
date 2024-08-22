import { useTodos } from "@context";

import "./index.css";

export function AboutPage() {
    const items = useTodos().filter((x) => !x.deleted);
    const itemsCount = items ? items.length : 0;
    return (
        <div className="about">
            <div className="card">
                <h2>About</h2>
                <p>You have {itemsCount} todo items left to complete in your list.</p>
                <p>This is a simple todo app.</p>
            </div>
        </div>
    );
}
