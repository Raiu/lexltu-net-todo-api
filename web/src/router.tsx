import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import { App } from "@/App";
import { AboutPage, AddTodoPage, ListTodoPage } from "@pages";

export const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<App />}>
            <Route path="about" element={<AboutPage />} />
            <Route path="add" element={<AddTodoPage />} />
            <Route index element={<ListTodoPage />} />
            <Route path="list" element={<ListTodoPage />} />
            <Route path="home" element={<ListTodoPage />} />
        </Route>
    ),
);
