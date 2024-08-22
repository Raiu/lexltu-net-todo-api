import { Footer } from "@components/Footer";
import { Header } from "@components/Header";
import { TodosProvider } from "@context";
import { Outlet } from "react-router-dom";

export function App() {
    return (
        <>
            <Header />
            <TodosProvider>
                <main className="main-content" style={{ maxWidth: "42rem", margin: "0 auto" }}>
                    <Outlet />
                </main>
            </TodosProvider>
            <Footer />
        </>
    );
}
