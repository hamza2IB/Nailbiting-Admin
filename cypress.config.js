const { defineConfig } = require("cypress");
const ccTask = require("@cypress/code-coverage/task");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      ccTask(on, config);
      return config;
    },
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
    env: {
      codeCoverage: {
        url: '/api/__coverage__'
      }
    },
    experimentalMemoryManagement: true,
    numTestsKeptInMemory: 1
  },
  component: {
    setupNodeEvents(on, config) {
      ccTask(on, config);
      return config;
    },
    devServer: {
      framework: 'next',
      bundler: 'webpack'
    }
  }
});
