import { defineConfig } from "vite";
import svgrPlugin from "vite-plugin-svgr";
import reactRefresh from "@vitejs/plugin-react-refresh";

export default defineConfig({
  build: {
    outDir: "build",
  },
  plugins: [reactRefresh(), svgrPlugin()],
  server: { open: true },
  resolve: {
    alias: [
      {
        // this is required for the SCSS modules
        find: /^~(.*)$/,
        replacement: "$1",
      },
    ],
  },
});
