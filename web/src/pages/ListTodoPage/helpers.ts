import { ITodo } from "@interfaces/Todo";

export function sortTodos(todos: ITodo[], sortBy: string, asc: boolean = true): ITodo[] {
    if (!todos?.length) {
        return todos;
    }

    const order = asc ? 1 : -1;
    const key = sortBy as keyof ITodo;

    return todos.sort((a, b) => {
        const aVal = a[key];
        const bVal = b[key];

        if (typeof aVal === "string" && typeof bVal === "string") {
            return aVal.localeCompare(bVal) * order;
        } else if (typeof aVal === "number" && typeof bVal === "number") {
            return (aVal - bVal) * order;
        }
        return 0;
    });
}
