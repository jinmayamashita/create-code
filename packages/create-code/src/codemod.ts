import * as path from "node:path";
import { run as jscodeshift } from "jscodeshift/src/Runner";

type Transforms =
  | "remove-module-pages-from-routes"
  | "remove-unauthenticated-routes"
  | "remove-unused-providers";

type Args = {
  transform: Transforms;
  filePath: string;
  options: {
    unusedPages?: string[];
    unusedModuleNames?: string[];
    authenticationModuleName?: string;
  };
};

export async function codemod({ transform, filePath, options }: Args) {
  const transformFilePath = path.resolve(
    __dirname,
    "..",
    "src",
    "transforms",
    `${transform}.ts`
  );

  await jscodeshift(transformFilePath, [filePath], {
    dry: false,
    print: false,
    babel: true,
    silent: true,
    // verbose: 2,
    ...options,
  });
}
