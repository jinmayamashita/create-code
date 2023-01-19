import path from "node:path";
import react from "@vitejs/plugin-react";

/**
 * @type { import('vite').UserConfig }
 */
const baseConfig = {
  resolve: {
    alias: {
      "@": path.resolve(process.cwd(), "src"),
    },
  },
};

/**
 * @type { import('vite').UserConfig }
 */
const reactConfig = {
  ...baseConfig,
  plugins: [react()],
};

export { reactConfig };
