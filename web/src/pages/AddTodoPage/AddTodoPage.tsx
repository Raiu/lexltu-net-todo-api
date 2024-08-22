import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTodosActions } from "@context";
import { INewTodo } from "@interfaces";

/* import { Add, RestartAlt } from "@mui/icons-material"; */

import "@components/Todo/AddTodo/index.css";

export function AddTodoPage() {
    const navigate = useNavigate();
    const { createTodo } = useTodosActions();
    const [newTodo, setNewTodo] = useState<INewTodo>({
        content: "",
        user: "",
    });

    const resetTodo = () => {
        setNewTodo({ content: "", user: "" });
        navigate(-1);
    };

    const addTodo = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!newTodo.content) {
            return;
        }
        createTodo(newTodo);
        resetTodo();
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setNewTodo({ ...newTodo, [e.target.name]: e.target.value });
    };

    return (
        <div className="create-todo">
            <div>
                <h2>Add Todo</h2>
            </div>
            <form id="form-create-todo" name="form-create-todo" action="" onSubmit={addTodo}>
                <div className="flex flex-col gap-2">
                    <div className="inputs flex flex-col gap-2">
                        <div className="inputfield">
                            <textarea
                                name="content"
                                onChange={handleChange}
                                placeholder="What needs to be done?"
                            />
                        </div>
                        <div className="inputfield">
                            <input
                                name="user"
                                type="text"
                                onChange={handleChange}
                                placeholder="Name..."
                            />
                        </div>
                    </div>
                    <div className="actions flex gap-2">
                        <button className="btn" type="reset" onClick={resetTodo}>
                            Reset
                        </button>
                        <button className="btn" type="submit">
                            Create
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
}
