# Create code monorepo (WIP)

A tool or library that helps automate the process of creating code.
Please refer to [README](packages/create-code/README.md) in `packages/create-code` to to get CLI app working on your shell.

Feel free to try!

## What's included?

- [`preview`](preview)
  - `react-app`: React with TypeScript
    - [`modules`](preview/react-app/src/modules): React modules
      - `password-generator`: A password generator module
      - `toggle`: Simple toggle module
  - `vue-app`: Vue with TypeScript
- `packages`
  - `create-code`: A command line interface tool
  - `tsconfig`: Shared TypeScript `tsconfig.json`
  - `e2e-testing`: A package for testing preview apps workflow from beginning to end
