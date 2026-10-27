import { defineConfig } from "vite-plus";

export default defineConfig({
  build: {
    rollupOptions: {
      input: { main: "index.html", trail: "trail.html" },
    },
  },
  test: {
    include: ["tests/**/*.test.js"],
  },
});
