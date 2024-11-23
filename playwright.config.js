import { defineConfig } from 'playwright/test';

export default defineConfig({
  // Glob patterns or regular expressions to ignore test files.
  testIgnore: '*test-assets',

  // Glob patterns or regular expressions that match test files.
  testMatch: '*playwright/*.spec.js',

  // Each test is given 30 seconds.
  timeout: 10000,

   // Folder for test artifacts such as screenshots, videos, traces, etc.
   outputDir: 'playwright-results',
});