import * as path from "node:path";
import fse from "fs-extra";

// helpers
export async function getDependencies(
  packageFilePath: string,
  excludeWorkspace: boolean = true
) {
  const packageFile = path.join(packageFilePath, "package.json");

  const pkg = JSON.parse(await fse.readFile(packageFile, "utf8"), (_, v) => {
    if (excludeWorkspace && v === "workspace:*") return;
    return v;
  });

  return {
    dependencies: pkg.dependencies as Record<string, string>,
    devDependencies: pkg.devDependencies as Record<string, string>,
  };
}
