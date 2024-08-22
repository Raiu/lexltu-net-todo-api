import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodos, useTodosActions } from "@context";
import { CardTodo, SortSelect } from "@components/Todo";
import { ISortOptions } from "@interfaces";
import { sortOptions } from "@data";
import { sortTodos } from "./helpers";

import "./index.css";

export function ListTodoPage(): ReactElement {
    const [editingTodoId, setEditingTodoId] = useState<number>(-1);
    const [sorting, setSorting] = useState<ISortOptions>(sortOptions[0]);
    const todos = useTodos();
    const actions = useTodosActions();
    const navigate = useNavigate();
    const sortedTodos = sortTodos(todos, sorting.field, sorting.asc);

    const handleChangeOrder = (id: number, change: number) => {
        actions.changeOrderTodo(id, change);
        setSorting(sortOptions.find((x) => x.field === "order" && x.asc) ?? sorting);
    };

    return (
        <div className="list-todo-page">
            <div
                className="actions"
                style={{ display: "flex", justifyContent: "space-between", padding: "0 2rem" }}
            >
                <button className="btn" onClick={() => navigate("/add")}>
                    Add Todo
                </button>
                <SortSelect options={sortOptions} current={sorting} setSorting={setSorting} />
            </div>
            <div className="list-todo">
                {sortedTodos
                    ? sortedTodos.map(
                          (todo) =>
                              !todo.deleted && (
                                  <CardTodo
                                      key={todo.id}
                                      todo={todo}
                                      actions={actions}
                                      setEditingTodoId={setEditingTodoId}
                                      editingTodoId={editingTodoId}
                                      changeOrder={handleChangeOrder}
                                  />
                              ),
                      )
                    : null}
            </div>
        </div>
    );
}
