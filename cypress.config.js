const { defineConfig } = require("cypress");
require("dotenv").config();

module.exports = defineConfig({
  env: {
    MOCKAROO_API_KEY: process.env.MOCKAROO_API_KEY,
  },
  e2e: {
    setupNodeEvents(on, config) {
    },
  },
});
