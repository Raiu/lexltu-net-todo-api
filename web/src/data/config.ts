import { ISortOptions } from "@interfaces";

export const sortOptions: ISortOptions[] = [
    { value: "priorityAsc", label: "Priority", field: "order", asc: true },
    { value: "priorityDesc", label: "Priority", field: "order", asc: false },
    { value: "authorAsc", label: "Author", field: "user", asc: true },
    { value: "authorDesc", label: "Author", field: "user", asc: false },
    { value: "timeAsc", label: "Time", field: "timestamp", asc: true },
    { value: "timeDesc", label: "Time", field: "timestamp", asc: false },
];
