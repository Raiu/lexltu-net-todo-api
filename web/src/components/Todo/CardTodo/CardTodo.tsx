import { ReactElement, useCallback, useEffect, useState } from "react";
import { ITodo, ITodoActions } from "@interfaces/Todo";

import {
    CloseOutlined,
    DeleteOutlined,
    EditOutlined,
    KeyboardArrowDownOutlined,
    KeyboardArrowUpOutlined,
    SaveAsOutlined,
} from "@mui/icons-material";

import "./index.css";

interface IProps {
    todo: ITodo;
    actions: ITodoActions;
    editingTodoId: number;
    setEditingTodoId: (value: number) => void;
    changeOrder: (id: number, change: number) => void;
}

export function CardTodo({
    todo,
    actions,
    editingTodoId,
    setEditingTodoId,
    changeOrder: changeOrderTodo,
}: IProps): ReactElement {
    const [isEditing, setIsEditing] = useState(false);
    const [currentTodo, setCurrentTodo] = useState<ITodo>({ ...todo });
    const time = timeAgo(new Date(todo.timestamp * 1000));

    const startEdit = () => {
        setIsEditing(true);
        setEditingTodoId(todo.id);
    };

    const cancelEdit = () => {
        setIsEditing(false);
        setCurrentTodo(todo);
        if (editingTodoId === todo.id) {
            setEditingTodoId(-1);
        }
    };

    const handleChangeOrder = (direction: number) => {
        changeOrderTodo(todo.id, direction);
    };

    const saveEdit = useCallback(() => {
        if (!isEditing) {
            return;
        }
        actions.updateTodo(currentTodo);
        if (editingTodoId === todo.id) {
            setEditingTodoId(-1);
        }
        setIsEditing(false);
    }, [isEditing, currentTodo, todo, actions, editingTodoId, setEditingTodoId]);

    const onToggleComplete = () => {
        setCurrentTodo((curr) => ({ ...curr, completed: !curr.completed }));
        actions.toggleCompletedTodo(todo.id);
    };

    useEffect(() => {
        if (editingTodoId !== todo.id && isEditing) {
            console.log("saveEdit");
            saveEdit();
        }
    }, [editingTodoId, todo, isEditing, saveEdit]);

    return (
        <div className={"card-todo " + (todo.completed ? "completed" : "")}>
            <div className={todo.completed ? "disabled-overlay" : ""}>
                <div className="flex gap-4">
                    <div className="complete">
                        <input
                            className="checkbox"
                            type="checkbox"
                            value="completed"
                            checked={todo.completed}
                            onChange={onToggleComplete}
                        />
                    </div>
                    {isEditing ? (
                        <div className="edit" style={{ width: "100%" }}>
                            <div className="">
                                <textarea
                                    value={currentTodo.content}
                                    onChange={(e) =>
                                        setCurrentTodo((p) => ({ ...p, content: e.target.value }))
                                    }
                                    rows={2}
                                    style={{ width: "100%" }}
                                />
                            </div>
                            <div className="actions">
                                <button className="btn close" onClick={() => cancelEdit()}>
                                    <CloseOutlined />
                                </button>

                                <button className="btn save" onClick={() => saveEdit()}>
                                    <SaveAsOutlined />
                                </button>
                            </div>
                        </div>
                    ) : (
                        <>
                            <div className="content">
                                <div>
                                    <span>{todo.content}</span>
                                </div>
                                <div className="legend flex gap-2">
                                    <span>Created by: {todo.user}</span>
                                    <span>-</span>
                                    <span>{time}</span>
                                </div>
                            </div>
                            <div className="actions">
                                <div>
                                    <button className="btn edit" onClick={() => startEdit()}>
                                        <EditOutlined />
                                    </button>
                                    <button
                                        className="btn delete"
                                        onClick={() => actions.deleteTodo(todo.id)}
                                    >
                                        <DeleteOutlined />
                                    </button>
                                </div>
                                <div
                                    className="sort"
                                    style={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "1rem",
                                    }}
                                >
                                    <button className="btn" onClick={() => handleChangeOrder(-1)}>
                                        <KeyboardArrowUpOutlined />
                                    </button>
                                    <button className="btn" onClick={() => handleChangeOrder(1)}>
                                        <KeyboardArrowDownOutlined />
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

function timeAgo(old: Date): string {
    const now = new Date();
    const diffInSec = Math.floor((now.getTime() - old.getTime()) / 1000);
    const units: { [key: string]: number } = {
        year: 31536000,
        month: 2592000,
        day: 86400,
        hour: 3600,
        minute: 60,
        second: 1,
    };

    for (const unit in units) {
        const unitCount = Math.floor(diffInSec / units[unit]);
        if (unitCount > 0) {
            return `${unitCount} ${unit}${unitCount > 1 ? "s" : ""} ago`;
        }
    }

    return "just now";
}
