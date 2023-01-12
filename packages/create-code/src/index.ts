#!/usr/bin/env node

import gradient from "gradient-string";
import chalk from "chalk";

// helpers
const welcome = async (title: string, desc: string) => {
  console.log(chalk.bold(gradient(["#9CECFB", "#65C7F7", "#0052D4"])(title)));
  await new Promise((resolve) => setTimeout(resolve, 500));
  console.log(chalk.hex("#0052D4")(desc));
};

async function run() {
  await welcome(
    "\n≛ Create code\n",
    "Let's quickly start a project with create code!\n"
  );
}

async function success() {
  console.log("success");
  process.exit();
}

async function fail() {
  process.exit(1);
}

run().then(success).catch(fail);
