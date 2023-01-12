#!/usr/bin/env node

import * as path from "node:path";
import fse from "fs-extra";
import Enquirer from "enquirer";
import gradient from "gradient-string";
import chalk from "chalk";
import meow from "meow";
import { REACT_APP_MODULES as modules } from "./constants";
import { mergeDependencies } from "./mergeDependencies";
import { getDependencies } from "./getDependencies";

const welcome = async (title: string, desc: string) => {
  console.log(chalk.bold(gradient(["#9CECFB", "#65C7F7", "#0052D4"])(title)));
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(chalk.hex("#0052D4")(desc));
};

const help = `
  Usage:
    $ npx create-code [flags...] [<dir>]
  If <dir> is not provided up front you will be prompted for it.
  Flags:
    --help, -h          Show this help message
    --version, -v       Show the version of this script
    --library, -lib     Explicitly tell the CLI which libraries to use in the app
`;

async function run() {
  const { input, flags } = meow(help, {
    flags: {
      help: { type: "boolean", default: false, alias: "h" },
      mini: { type: "boolean", default: false, alias: "m" },
      library: { type: "string", alias: "lib" },
      version: { type: "boolean", default: false, alias: "v" },
    },
  });

  await welcome(
    "\n≛ Create code\n",
    "Let's quickly start a development app with some base code!\n"
  );

  const appDir = path.resolve(
    process.cwd(),
    input.length > 0
      ? input[0]
      : (
          await Enquirer.prompt<{ dir: string }>({
            type: "input",
            name: "dir",
            initial: "./my-app",
            message: "Where would you like to create your app?",
          })
        ).dir
  );

  const appName = path.basename(appDir);

  // Make app directory
  fse.mkdirSync(appDir, { recursive: true });

  const uiLibrary =
    flags.library ||
    (
      await Enquirer.prompt<{ uiLibrary: string }>({
        type: "select",
        name: "uiLibrary",
        initial: 0,
        message: "Which library to choose for your app?",
        choices: [
          { name: "react", message: "React" },
          { name: "vue", message: "Vue.js" },
          // { name: "solid", message: "Solid" },
          // { name: "svelte", message: "Svelte" },
          // { name: "nextjs", message: "Next.js" },
        ],
      })
    ).uiLibrary;

  const uiLibrariesDir = path.resolve(__dirname, "../../..", "preview");
  const uiLibraryDir = path.resolve(uiLibrariesDir, `${uiLibrary}-app`);

  if (!fse.readdirSync(uiLibrariesDir).includes(path.basename(uiLibraryDir))) {
    throw Error("\nSorry, we do not support the library you typed.");
  }

  // Copy basic files from preview app
  fse.copySync(uiLibraryDir, appDir, {
    filter: (src) =>
      ![
        "node_modules",
        "dist",
        ".turbo",
        "modules",
        "pages",
        "routes.tsx",
        "context.tsx",
        "package.json",
        "tsconfig.json",
      ].includes(path.basename(src)),
  });

  const templatesDir = path.resolve(__dirname, "../templates");
  const sharedDir = path.resolve(templatesDir, "_shared");

  // Copy shared files
  fse.copySync(sharedDir, appDir, {
    overwrite: true,
  });

  const libraryTemplateDir = path.resolve(
    templatesDir,
    path.basename(uiLibraryDir)
  );

  // Copy library template files
  fse.copySync(libraryTemplateDir, appDir);

  // Rename gitignore
  fse.renameSync(
    path.join(appDir, "gitignore"),
    path.join(appDir, ".gitignore")
  );

  const useModules =
    // FIXME: For verification purposes, we are only temporarily working on modules of react.
    uiLibrary === "react"
      ? (
          await Enquirer.prompt<{ modules: (keyof typeof modules)[] }>({
            type: "multiselect",
            name: "modules",
            initial: 0,
            message: "Which modules to choose for your app?",
            choices: Object.entries(modules).map(([name, { message }]) => ({
              name,
              message,
            })),
          })
        ).modules.map((module) => ({ name: module, ...modules[module] }))
      : [];

  const modulesDir = path.resolve(uiLibraryDir, "src", "modules");
  const appModulesDir = path.resolve(appDir, "src", "modules");

  const pagesDir = path.resolve(uiLibraryDir, "src", "pages");
  const appPagesDir = path.resolve(appDir, "src", "pages");

  useModules.forEach((module) => {
    const moduleDir = path.join(modulesDir, module.name);

    // Copy selected modules
    fse.copySync(moduleDir, path.join(appModulesDir, module.name), {
      filter: (src) =>
        ![
          "node_modules",
          "dist",
          ".turbo",
          "package.json",
          "tsconfig.json",
          "README.md",
        ].includes(path.basename(src)),
    });

    // Copy selected module pages
    fse.copySync(pagesDir, appPagesDir, {
      filter: (src) =>
        ["pages", "home.tsx", ...module.pages].includes(path.basename(src)),
    });
  });

  // Merge packages
  const { dependencies, devDependencies } = mergeDependencies([
    await getDependencies(uiLibraryDir),
    ...(await Promise.all(
      useModules.map((module) =>
        getDependencies(path.join(modulesDir, module.name))
      )
    )),
  ]);

  // Overwrite package.json
  const packageFile = path.join(appDir, "package.json");

  fse.writeFileSync(
    packageFile,
    JSON.stringify(
      JSON.parse(await fse.readFile(packageFile, "utf8"), (k, v) => {
        if (k === "dependencies") return dependencies;
        if (k === "devDependencies") return devDependencies;
        return v;
      }),
      null,
      2
    )
  );

  return appName;
}

async function success(appDir: string) {
  console.log(
    `${chalk.bold(
      gradient(["#0052D4", "#65C7F7", "#9CECFB"])("Success!")
    )} Created a new app at "${appDir}".`
  );
  console.log("Inside this directory, you can run several commands:");
  console.log();
  console.log(chalk.cyan(`  pnpm dev`));
  console.log(`     Develop your app`);
  console.log();
  console.log(chalk.cyan(`  pnpm build`));
  console.log(`     Build your app`);
  process.exit();
}

async function fail(error: Error) {
  console.log(error.message);
  if (!error.message) throw Error();

  process.exit(1);
}

run().then(success).catch(fail);
