import { test, expect } from '@playwright/test';

test.describe('p5.js Editor Prototype - Accessibility', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should have appropriate ARIA labels for buttons', async ({ page }) => {
    // Verify that all core action buttons have aria-labels (Unique A11y Feature)
    const runButton = page.getByLabel('Run sketch');
    await expect(runButton).toBeVisible();

    const saveButton = page.getByLabel('Save project');
    await expect(saveButton).toBeVisible();
    
    const loginButton = page.getByLabel('Log in');
    await expect(loginButton).toBeVisible();
  });

  test('editor textarea should have an accessible name', async ({ page }) => {
    const editor = page.getByRole('textbox', { name: 'Code Editor' });
    await expect(editor).toBeVisible();
  });
});
