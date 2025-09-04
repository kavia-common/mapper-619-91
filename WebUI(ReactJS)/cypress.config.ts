import { defineConfig } from "cypress";

export default defineConfig({
  video: false,
  viewportWidth: 1280,
  viewportHeight: 800,
  e2e: {
    baseUrl: process.env.CYPRESS_BASE_URL || "http://localhost:3000",
    supportFile: "cypress/support/e2e.ts",
    specPattern: "cypress/e2e/**/*.cy.{js,jsx,ts,tsx}",
    env: {
      apiUrl: process.env.REACT_APP_API_URL || "http://localhost:8000/api",
    },
  },
});
