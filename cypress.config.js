const { defineConfig } = require("cypress");
const ccTask = require("@cypress/code-coverage/task");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      ccTask(on, config);
      return config;
    },
    baseUrl: process.env.CYPRESS_BASE_URL || 'http://localhost:3000',
  },
});
