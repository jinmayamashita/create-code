import { defineConfig } from "vite";

// @ts-expect-error
import { reactConfig } from "viteconfig";

export default defineConfig(() => reactConfig);
