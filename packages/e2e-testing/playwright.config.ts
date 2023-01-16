import type { PlaywrightTestConfig } from "@playwright/test";

const config: PlaywrightTestConfig = {
  projects: [
    {
      name: "react-mini",
      testMatch: "react-mini/**/*",
      use: {
        baseURL: "http://localhost:3000",
      },
    },
    {
      name: "react-standard",
      testMatch: "react-standard/**/*",
      use: {
        baseURL: "http://localhost:3001",
      },
    },
    {
      name: "vue-mini",
      testMatch: "vue-mini/**/*",
      use: {
        baseURL: "http://localhost:3002",
      },
    },
    {
      name: "vue-standard",
      testMatch: "vue-standard/**/*",
      use: {
        baseURL: "http://localhost:3003",
      },
    },
  ],
};

export default config;
