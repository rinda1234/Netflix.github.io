import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
    plugins: [react()],
    base: "/Netflix.github.io/", // ⭐ 매우 중요
});
