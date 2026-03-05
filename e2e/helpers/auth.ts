import { Page } from '@playwright/test';

export async function login(page: Page, username: string = 'gsoc_candidate') {
  await page.getByTestId('login-button').click();
  await page.getByTestId('username-input').fill(username);
  await page.getByTestId('submit-login').click();
}

export async function logout(page: Page) {
  await page.getByTestId('logout-button').click();
}
