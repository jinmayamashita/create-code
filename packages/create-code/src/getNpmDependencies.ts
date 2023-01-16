import * as path from "node:path";
import fse from "fs-extra";

type Options = {
  excludes?: string[];
};

export async function getNpmDependencies(filePath: string, options?: Options) {
  const packageFile = path.join(filePath, "package.json");

  const { dependencies, devDependencies } = JSON.parse(
    await fse.readFile(packageFile, "utf8"),
    (k, v) => {
      if (v === "workspace:*") return;
      if (options?.excludes?.length && options.excludes.includes(k)) return;

      return v;
    }
  ) as Record<any, any>;

  return {
    dependencies,
    devDependencies,
  } as const;
}
