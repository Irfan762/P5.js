import { test, expect } from '@playwright/test';
import { login, logout } from '../helpers/auth';

test.describe('p5.js Editor Prototype - Automated Authentication', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should login automatically and show username', async ({ page }) => {
    // 1. Click login button (AUTOMATED)
    await login(page, 'gsoc_candidate');

    // 2. Verify username is visible (AUTOMATED)
    const username = page.getByTestId('username-display');
    await expect(username).toHaveText('gsoc_candidate');
  });

  test('should logout automatically and show login button', async ({ page }) => {
    // 1. Login first (AUTOMATED)
    await login(page, 'gsoc_candidate');

    // 2. Perform logout (AUTOMATED)
    await logout(page);

    // 3. Verify login button is visible again (AUTOMATED)
    const loginButton = page.getByTestId('login-button');
    await expect(loginButton).toBeVisible();
  });
});
