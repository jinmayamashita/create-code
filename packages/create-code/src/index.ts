#!/usr/bin/env node

import * as path from "node:path";
import fse from "fs-extra";
import meow from "meow";
import inquirer from "inquirer";
import chalk from "chalk";
import gradient from "gradient-string";
import { copyFiles } from "./copyFiles";
import { copyModules } from "./copyModules";
import { getNpmDependencies } from "./getNpmDependencies";
import {
  LibraryName,
  LIBRARIES,
  MODULES,
  MODULES_DIR,
  APPS,
  TEMPLATE_FILES,
} from "./constants";
import { codemod } from "./codemod";

const help = `
  Usage:
    $ npx create-code [<dir>] [<lib>] [flags...]
  Flags:
    --options, -o       You can select the libraries and modules you want use in with a prompt        
    --mini, -m          Build with minimal configuration
    --help, -h          Show this help message
    --version, -v       Show the version of this script
`;

async function run() {
  const { input, flags } = meow(help, {
    flags: {
      help: { type: "boolean", default: false, alias: "h" },
      mini: { type: "boolean", default: false, alias: "m" },
      version: { type: "boolean", default: false, alias: "v" },
      options: { type: "boolean", alias: "o" },
    },
  });

  // Default library to "react"
  const [_dir, _lib = "react"] = input as [string, LibraryName];
  const { mini: isMini, options: isOptions } = flags;

  await welcomeMessage(
    "\n≛ Create code\n",
    "Let's quickly start a development app with some base code!\n"
  );

  const appDir = path.resolve(
    process.cwd(),
    _dir
      ? _dir
      : (
          await inquirer.prompt<{ dir: string }>([
            {
              type: "input",
              name: "dir",
              message: "Where would you like to create your app?",
              default: "./my-app",
            },
          ])
        ).dir
  );

  const appName = path.basename(appDir);

  const selectedLibrary =
    !isOptions && LIBRARIES[_lib]
      ? _lib
      : ((
          await inquirer.prompt<{ lib: string }>([
            {
              type: "list",
              name: "lib",
              default: "react",
              message: "Which library would you like to use?",
              choices: [
                { name: "React", value: "react" },
                { name: "Vue", value: "vue" },
                { name: "Next.js", value: "next" },
                { name: "Solid", value: "solid" },
                { name: "Svelte", value: "svelte" },
              ],
            },
          ])
        ).lib as LibraryName);

  const libraryModules = MODULES[selectedLibrary];

  const selectedModules =
    !isMini && isOptions && libraryModules.length
      ? (
          await inquirer.prompt<{ modules: string[] }>([
            {
              name: "modules",
              type: "checkbox",
              message: "Select the modules you want to use",
              choices: MODULES[selectedLibrary],
              validate(answer) {
                if (answer.length < 1) return "You must choose at least one.";
                return true;
              },
            },
          ])
        ).modules
      : libraryModules.map(({ value }) => value);

  const moduleDirs = selectedModules.map((module) =>
    path.resolve(MODULES_DIR, `${selectedLibrary}-with-${module}`)
  );

  // Copy base app
  const appTemplateDir = path.resolve(
    APPS,
    `${selectedLibrary}-${isMini ? "mini" : "standard"}`
  );
  copyFiles(appTemplateDir, appDir);

  // Overwrite shared files
  ["_shared", selectedLibrary].forEach((name) => {
    const dir = path.resolve(TEMPLATE_FILES, name);
    fse.copySync(dir, appDir, { overwrite: true });
  });

  // Copy modules
  !isMini &&
    copyModules(
      selectedLibrary,
      selectedModules,
      path.resolve(appDir, "src", "modules")
    );

  const srcDir = path.resolve(appDir, "src");

  // FIXME: Run only if selectedLibrary is `React` for now.
  if (
    selectedLibrary === "react" &&
    selectedModules.length !== libraryModules.length
  ) {
    // Remove unused page files
    const unusedModules = libraryModules.filter(
      (x) => !selectedModules.includes(x.value)
    );

    const unusedPages = unusedModules.flatMap(({ pages }) => pages);
    const unusedModuleNames = unusedModules.map(({ value }) => value);

    for (const page of unusedPages) {
      await fse.remove(path.resolve(appDir, "src", "pages", `${page}.tsx`));
    }

    // React: Remove unused imports and component codes in routes.tsx
    await codemod({
      transform: "remove-module-pages-from-routes",
      filePath: [path.resolve(srcDir, "routes.tsx")],
      options: { unusedPages },
    });

    // React: Remove unused context codes in context.tsx
    await codemod({
      transform: "remove-unused-providers",
      filePath: [path.resolve(srcDir, "context.tsx")],
      options: { unusedModuleNames },
    });

    // React: Reduce routes if authentication is not used in routes.tsx
    if (!selectedModules.includes("authentication")) {
      await codemod({
        transform: "remove-unauthenticated-routes",
        filePath: [path.resolve(srcDir, "routes.tsx")],
        options: { authenticationModuleName: "authentication" },
      });
    }
  }

  // Rename module import declarations
  // Run only if selectedLibrary is `React` for now.
  selectedLibrary === "react" &&
    (await codemod({
      transform: "rename-import-declarations",
      filePath: [
        path.resolve(srcDir, "routes.tsx"),
        path.resolve(srcDir, "context.tsx"),
        path.resolve(srcDir, "pages"),
      ],
      options: { library: selectedLibrary, moduleNames: selectedModules },
    }));

  // Get base dependencies
  const baseDependencies = await getNpmDependencies(appTemplateDir);

  // Get modules dependencies
  const excludeDependencies = ["vitest", "happy-dom", "@testing-library/react"];
  const moduleDependencies = isMini
    ? []
    : await Promise.all(
        moduleDirs.map((dir) =>
          getNpmDependencies(dir, { excludes: excludeDependencies })
        )
      );

  // Merge based on baseDependencies.
  const { dependencies, devDependencies } = [...moduleDependencies].reduceRight(
    (pre, cur) => {
      return {
        dependencies: { ...pre?.dependencies, ...cur.dependencies },
        devDependencies: { ...pre?.devDependencies, ...cur.devDependencies },
      };
    },
    baseDependencies
  );

  // Overwrite package.json
  const packageFile = path.join(appDir, "package.json");
  fse.writeFileSync(
    path.join(appDir, "package.json"),
    JSON.stringify(
      JSON.parse(await fse.readFile(packageFile, "utf8"), (k, v) => {
        if (k === "name") return appName;
        if (k === "dependencies") return dependencies;
        if (k === "devDependencies") return devDependencies;

        return v;
      }),
      null,
      2
    )
  );

  // Rename gitignore
  fse.renameSync(
    path.join(appDir, "gitignore"),
    path.join(appDir, ".gitignore")
  );

  return { dirName: appName, libraryName: selectedLibrary };
}

async function welcomeMessage(title: string, desc?: string) {
  console.log(chalk.bold(gradient(["#9CECFB", "#65C7F7", "#0052D4"])(title)));
  desc && console.log(chalk.hex("#65C7F7")(desc));
}

async function success({
  dirName,
  libraryName,
}: {
  dirName: string;
  libraryName: string;
}) {
  console.log(`Created a new app at "${dirName}" with ${libraryName}.`);
  console.log("Inside this directory, you can run several commands:");
  console.log();
  console.log(chalk.cyan(`  pnpm dev`));
  console.log(`     Develop your app`);
  console.log();
  console.log(chalk.cyan(`  pnpm build`));
  console.log(`     Build your app\n`);
  process.exit();
}

async function fail(error: Error) {
  console.log(error.message);
  if (!error.message) throw Error();

  process.exit(1);
}

run().then(success).catch(fail);
