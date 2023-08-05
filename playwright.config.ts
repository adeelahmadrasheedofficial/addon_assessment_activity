import { expect, PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";
// @ts-ignore
import path from "path";

require("dotenv").config();

export const PROJECT_NAME = process.env.PROJECT_NAME;
export const APP_VERSION = process.env.APP_VERSION;
export const BASE_URL = process.env.BASE_URL;

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: "./tests",
  /* Maximum time one test can run for. */
  timeout: 500 * 1000,
  expect: {
    timeout: 300 * 1000,
  },
  /* Run tests in files in parallel */
  fullyParallel: true,
  /* Retry */
  retries: 0,
  workers: 1,
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [
    ["list"],
    [
      "monocart-reporter",
      {
        name: `${PROJECT_NAME} | ` + `BUILD - ${APP_VERSION}`,
        cwd: "/additional_assessment",
        outputFile: "./reporter/index.html",
      },
    ],
  ],
  /* Global settings. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    baseURL: process.env.BASE_URL,
    extraHTTPHeaders: {
      "app-version": `${APP_VERSION}`,
    },
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },

    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
    },

    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
    },
  ],

  /* Folder for test artifacts such as screenshots, videos, traces, etc. */
  outputDir: "./fixtures",
};

// Created a custom assertion for validating the API response code
expect.extend({
  toBeWithinRange(received: number, firstnum: number, lastnum: number) {
    const pass = received >= firstnum && received <= lastnum;
    if (pass) {
      return {
        message: () => "Test case is passed",
        pass: true,
      };
    } else {
      return {
        message: () =>
          `Test case is failed due to received the status ${received}`,
        pass: false,
      };
    }
  },
});

export default config;
