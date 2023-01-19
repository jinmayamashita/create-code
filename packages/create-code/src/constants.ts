import * as path from "node:path";

export type LibraryName = "react" | "vue" | "solid" | "next" | "svelte";

export const LIBRARIES = {
  react: true,
  vue: true,
  solid: true,
  next: true,
  svelte: true,
} as Record<LibraryName, true>;

export const MODULES = {
  react: [
    { name: "Toggle", value: "toggle", pages: ["toggle"] },
    { name: "Context", value: "context", pages: ["update-password"] },
    { name: "Authentication", value: "authentication", pages: ["login"] },
  ],
  vue: [],
  solid: [],
  next: [],
  svelte: [],
} as Record<LibraryName, { name: string; value: string; pages: string[] }[]>;

export const TEMPLATE_FILES = path.resolve(__dirname, "..", "templates");

// paths
const TEMPLATES_DIR = path.resolve(__dirname, "..", "_templates");
export const APPS = path.resolve(TEMPLATES_DIR, "apps");
export const MODULES_DIR = path.resolve(TEMPLATES_DIR, "modules");
