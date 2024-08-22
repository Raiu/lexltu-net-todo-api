export * from "./Todo";

export interface IUser {
    id: number;
    name: string;
}

export interface ISortOptions {
    value: string;
    label: string;
    field: string;
    asc: boolean;
}
