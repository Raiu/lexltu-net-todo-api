export interface ITodo {
    id: number;
    user: string;
    content: string;
    timestamp: number;
    order: number;
    completed: boolean;
    deleted: boolean;
}

export interface INewTodo {
    content: string;
    user: string;
}

export type TAction =
    | { type: ActionType.CREATE; data: INewTodo }
    | { type: ActionType.UPDATE; data: ITodo }
    | { type: ActionType.DELETE; data: number }
    | { type: ActionType.TOGGLE_COMPLETED; data: number }
    | { type: ActionType.CHANGE_ORDER; data: { id: number; change: number } };

export interface ITodoActions {
    createTodo: (todo: INewTodo) => void;
    updateTodo: (todo: ITodo) => void;
    deleteTodo: (id: number) => void;
    toggleCompletedTodo: (id: number) => void;
    changeOrderTodo: (id: number, change: number) => void;
}

export enum ActionType {
    CREATE = "CREATE",
    UPDATE = "UPDATE",
    DELETE = "DELETE",
    TOGGLE_COMPLETED = "TOGGLE_COMPLETED",
    CHANGE_ORDER = "CHANGE_PRIORITY",
}
