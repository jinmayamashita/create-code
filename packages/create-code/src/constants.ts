import * as path from "node:path";

export type LibraryName = "react" | "vue" | "solid";

export const LIBRARIES = {
  react: true,
  vue: true,
  solid: true,
} as Record<LibraryName, true>;

export const MODULES = {
  react: [
    { name: "Toggle", value: "toggle", pages: [] },
    { name: "Context", value: "context", pages: [] },
    { name: "Authentication", value: "authentication", pages: [] },
  ],
  vue: [{ name: "vue-toggle", value: "vue-toggle", pages: [] }],
  solid: [{ name: "solid-toggle", value: "solid-toggle", pages: [] }],
} as Record<LibraryName, { name: string; value: string; pages: string[] }[]>;

export const SHARED_FILES = path.resolve(
  __dirname,
  "..",
  "templates",
  "_shared"
);

// paths
const TEMPLATES_DIR = path.resolve(__dirname, "..", "_templates");
export const APPS = path.resolve(TEMPLATES_DIR, "apps");
export const MODULES_DIR = path.resolve(TEMPLATES_DIR, "modules");
