import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "./src"),
            "@components": path.resolve(__dirname, "./src/components"),
            "@data": path.resolve(__dirname, "./src/data"),
            "@interfaces": path.resolve(__dirname, "./src/interfaces"),
            "@context": path.resolve(__dirname, "./src/context"),
            "@pages": path.resolve(__dirname, "./src/pages"),
        },
    },
});
