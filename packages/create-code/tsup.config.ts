import { defineConfig, Options } from "tsup";
import path from "node:path";
import fse from "fs-extra";

const excludes = [
  "node_modules",
  "dist",
  ".turbo",
  "README.md",
  // "package.json",
  "tsconfig.json",
  "tests",
  ".next",
  ".svelte-kit",
];

async function copyTemplateFiles() {
  const templateDir = path.resolve(__dirname, "_templates");
  if (fse.existsSync(templateDir)) return;

  const apps = path.resolve(__dirname, "..", "..", "examples");
  const modules = path.resolve(__dirname, "..", "..", "modules");

  const filter = (src: string) => !excludes.includes(path.basename(src));

  fse.copySync(apps, path.resolve(templateDir, "apps"), { filter });
  fse.copySync(modules, path.resolve(templateDir, "modules"), { filter });
}

export default defineConfig((options: Options) => ({
  entry: ["src/index.ts"],
  format: ["cjs"],
  clean: true,
  onSuccess: copyTemplateFiles,
  ...options,
}));
