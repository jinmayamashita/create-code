import * as path from "node:path";
import { MODULES_DIR } from "./constants";
import { copyFiles } from "./copyFiles";

export async function copyModules(
  lib: string,
  modules: string[],
  dest: string
) {
  modules.forEach((module) => {
    const moduleDir = `${lib}-with-${module}`;
    const source = path.resolve(MODULES_DIR, moduleDir);

    copyFiles(source, path.resolve(dest, module));
  });
}
