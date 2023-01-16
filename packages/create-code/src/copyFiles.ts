import * as path from "node:path";
import fse from "fs-extra";

const defaultExcludes = [
  "node_modules",
  "dist",
  ".turbo",
  "README.md",
  "package.json",
  "tsconfig.json",
  "tests",
];

export async function copyFiles(
  sources: string,
  dest: string,
  excludes: string[] = defaultExcludes
) {
  const filter = (src: string) => !excludes.includes(path.basename(src));
  fse.copySync(sources, dest, { filter });
}
