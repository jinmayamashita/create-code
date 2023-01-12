import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  projects: [
    {
      name: "react-app",
      testMatch: "react-app/**/*",
      use: {
        baseURL: "http://localhost:3000",
      },
    },
    {
      name: "vue-app",
      testMatch: "vue-app/**/*",
      use: {
        baseURL: "http://localhost:3001",
      },
    },
  ],
};

export default config;
