#!/usr/bin/env node

import * as path from "node:path";
import fse from "fs-extra";
import meow from "meow";
import inquirer from "inquirer";
import chalk from "chalk";
import gradient from "gradient-string";

type LibraryName = "react" | "vue" | "solid";

const LIBRARIES = {
  react: true,
  vue: true,
  solid: true,
} as Record<LibraryName, true>;

const MODULES = {
  react: [
    { name: "Toggle", value: "toggle", pages: [] },
    { name: "Context", value: "context", pages: [] },
  ],
  vue: [{ name: "vue-toggle", value: "vue-toggle", pages: [] }],
  solid: [{ name: "solid-toggle", value: "solid-toggle", pages: [] }],
} as Record<LibraryName, { name: string; value: string; pages: string[] }[]>;

const SHARED_FILES = path.resolve(__dirname, "..", "templates", "_shared");
const TEMPLATES_DIR = path.resolve(__dirname, "..", "_templates");
const APPS = path.resolve(TEMPLATES_DIR, "apps");
const MODULES_DIR = path.resolve(TEMPLATES_DIR, "modules");

const help = `
  Usage:
    $ npx create-code [<dir>] [<lib>] [flags...]
  Flags:
    --options, -o       You can select the modules you want use in with a prompt        
    --mini, -m          Minimal modules
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

  const [_dir, _lib = "react"] = input as [string, LibraryName];
  const { mini: isMini, options: isOptions } = flags;

  await welcome(
    "\n≛ Create code\n"
    // "Let's quickly start a development app with some base code!\n"
  );

  const dir = path.resolve(
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

  const dirName = path.basename(dir);

  const lib = LIBRARIES[_lib]
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
              { name: "Vue.js", value: "vue" },
            ],
          },
        ])
      ).lib as LibraryName);

  const modules =
    !isMini && isOptions
      ? (
          await inquirer.prompt<{ modules: string[] }>([
            {
              name: "modules",
              type: "checkbox",
              message: "Select the modules you want to use",
              choices: MODULES[lib],
              validate(answer) {
                if (answer.length < 1) return "You must choose at least one.";
                return true;
              },
            },
          ])
        ).modules
      : MODULES[lib].map(({ value }) => value);

  const moduleDirs = modules.map((module) =>
    path.resolve(MODULES_DIR, `${lib}-with-${module}`)
  );

  // Copy app
  const appDir = path.resolve(APPS, `${lib}-${isMini ? "mini" : "standard"}`);
  copyFiles(appDir, dir);

  // Copy shared files
  fse.copySync(SHARED_FILES, dir, { overwrite: true });

  // Rename gitignore
  fse.renameSync(path.join(dir, "gitignore"), path.join(dir, ".gitignore"));

  // Copy modules
  !isMini && copyModules(lib, modules, path.resolve(dir, "src", "modules"));

  // Packages
  // TOOO: Make it easy to understand
  const basePackages = await getPackages(appDir);

  // Merge packages
  // TOOO: Make it easy to understand
  const pkgs = mergePackages([
    basePackages,
    ...(await Promise.all(moduleDirs.map((d) => getPackages(d)))),
  ]);

  // Write package.json
  // TOOO: Make it easy to understand
  const packageFile = path.join(dir, "package.json");
  fse.writeFileSync(
    path.join(dir, "package.json"),
    JSON.stringify(
      JSON.parse(await fse.readFile(packageFile, "utf8"), (k, v) => {
        if (k === "name") return dirName;
        if (k === "dependencies") return pkgs.dependencies;
        if (k === "devDependencies") return pkgs.devDependencies;
        return v;
      }),
      null,
      2
    )
  );

  // TODO: codemods

  // console.log("- lib:", lib);
  // console.log("- dir:", dir);
  // console.log("- mini:", isMini);
  // console.log("- modules:", modules);
  // console.log("- modules dirs:", moduleDirs);
  // console.log("- pkgs: ", JSON.stringify(pkgs, null, 2));

  return dirName;
}

export async function getPackages(dirName: string) {
  const packageFile = path.join(dirName, "package.json");

  const { dependencies, devDependencies } = JSON.parse(
    await fse.readFile(packageFile, "utf8"),
    (k, v) => {
      const excludes = ["vitest", "happy-dom", "@testing-library/react"];

      if (v === "workspace:*") return;
      if (excludes.includes(k)) return;

      return v;
    }
  ) as {
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  };

  return {
    dependencies,
    devDependencies,
  };
}

function mergePackages(
  x: {
    dependencies: Record<string, string>;
    devDependencies: Record<string, string>;
  }[]
) {
  let deps = {};
  let devDeps = {};

  x.forEach(({ dependencies, devDependencies }) => {
    deps = { ...deps, ...dependencies };
    devDeps = { ...devDeps, ...devDependencies };
  });

  return {
    dependencies: deps,
    devDependencies: devDeps,
  };
}

async function copyFiles(sources: string, dest: string) {
  const excludes = [
    "node_modules",
    "dist",
    ".turbo",
    "README.md",
    "package.json",
    "tsconfig.json",
    "tests",
  ];
  const filter = (src: string) => !excludes.includes(path.basename(src));
  fse.copySync(sources, dest, { filter });
}

async function copyModules(lib: string, modules: string[], dest: string) {
  modules.forEach((module) => {
    const moduleDir = `${lib}-with-${module}`;
    const source = path.resolve(MODULES_DIR, moduleDir);

    copyFiles(source, path.resolve(dest, module));
  });
}

async function welcome(title: string, desc?: string) {
  console.log(chalk.bold(gradient(["#9CECFB", "#65C7F7", "#0052D4"])(title)));
  desc && console.log(chalk.hex("#65C7F7")(desc));
}

async function success(appDir: string) {
  // console.log(
  //   `${chalk.bold(
  //     gradient(["#0052D4", "#65C7F7", "#9CECFB"])("Success!")
  //   )} Created a new app at "${appDir}".`
  // );
  console.log(`Created a new app at "${appDir}".`);
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
