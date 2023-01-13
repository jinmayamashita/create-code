import * as path from "node:path";
import { run as jscodeshift } from "jscodeshift/src/Runner";

type Transforms =
  | "remove-module-pages-from-routes"
  | "remove-unauthenticated-routes"
  | "remove-unused-providers";

export async function codemod(
  transformName: Transforms,
  filePaths: string[],
  args?: Record<string, string[]>
) {
  const transformFilePath = path.resolve(
    __dirname,
    "..",
    "src",
    "transforms",
    `${transformName}.ts`
  );

  await jscodeshift(transformFilePath, filePaths, {
    dry: false,
    print: false,
    babel: true,
    silent: true,
    ...args,
  });
}
