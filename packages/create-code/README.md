# Create code

https://user-images.githubusercontent.com/9401060/212142349-83889472-de26-479c-829a-b5814ba2621c.mp4

<details>

<summary>Example of created code</summary>

```
├── README.md
├── index.html
├── package.json
├── pnpm-lock.yaml
├── public
|  └── logo.svg
├── src
|  ├── app.tsx
|  ├── context.tsx
|  ├── main.tsx
|  ├── modules
|  |  └── password-generator
|  |     ├── components
|  |     |  └── password-generator.tsx
|  |     ├── hooks
|  |     |  ├── use-generate-password.test.ts
|  |     |  └── use-generate-password.ts
|  |     └── index.ts
|  ├── pages
|  |  ├── home.tsx
|  |  └── password.tsx
|  ├── routes.tsx
|  └── vite-env.d.ts
├── tsconfig.json
└── tsconfig.node.json
```
  
</details>



A command line interface (CLI) tool that can be used to quickly set up a new project using a frontend template.

To get started, open a new shell and run:

```sh
pnpm build && npm i -g
```

Then run the following command:

```sh
npx create-code
```


