import { Page } from '@playwright/test';

export async function login(page: Page, username: string = 'gsoc_candidate') {
  await page.getByTestId('login-button').click();
  // Wait for login page to appear
  await page.waitForSelector('[data-testid="username-input"]');
  await page.getByTestId('username-input').fill(username);
  await page.getByTestId('submit-login').click();
  // Wait to return to main app
  await page.waitForSelector('[data-testid="code-editor"]');
}

export async function logout(page: Page) {
  await page.getByTestId('logout-button').click();
}
