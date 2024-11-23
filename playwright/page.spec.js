import { test, expect } from 'playwright/test';

test.describe('Feature: El usuario puede Crear Pages', () => {
  test.beforeEach(async ({ page }) => {
    // Go to the starting url before each test.
    await page.goto('http://localhost:2368/ghost');

    const inputEmail = await page.locator('.email');

    const inputPassword = await page.locator('.password');

    await inputEmail.fill('d.andrades@uniandes.edu.co');

    await inputPassword.fill('ArpolisVI204*');
    // Generic click
    await page.locator('.login.gh-btn').click();

  });

  test('main navigation', async ({ page }) => {
    // Assertions use the expect API.
    await page.goto('http://localhost:2368/ghost/#/pages');

    await page.goto('http://localhost:2368/ghost/#/editor/page');



  });
});