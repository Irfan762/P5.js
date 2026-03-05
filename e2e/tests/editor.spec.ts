import { test, expect } from '@playwright/test';

test.describe('p5.js Editor Prototype - Editor Workflows', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  test('should allow typing and running a sketch', async ({ page }) => {
    const editor = page.locator('.CodeMirror-p5');
    await editor.fill("console.log('Test log');");
    
    const runButton = page.getByLabel('Run sketch');
    await runButton.click();

    const consoleOutput = page.getByTestId('console-output');
    await expect(consoleOutput).toContainText('Running sketch...');
    
    // Check if iframe rendering (sketch preview) is visible
    const previewFrame = page.frameLocator('iframe[title="sketch preview"]');
    await expect(previewFrame.locator('text=Sketch Executing')).toBeVisible();
  });

  test('should show login modal when saving without being logged in', async ({ page }) => {
    const saveButton = page.getByLabel('Save project');
    await saveButton.click();

    const loginModal = page.getByTestId('login-modal');
    await expect(loginModal).toBeVisible();
    await expect(loginModal).toContainText('Sign In Required');
  });

  test('should trigger autosave after 5 seconds of typing', async ({ page }) => {
    const editor = page.locator('.CodeMirror-p5');
    
    // Simulate being logged in first
    await page.evaluate(() => localStorage.setItem('p5_user', 'test_user'));
    await page.reload();

    await editor.fill("typing for autosave...");
    
    // Wait for the debounce period (5s) + buffer
    const toast = page.getByTestId('toast-notification');
    await expect(toast).toBeVisible({ timeout: 10000 });
    await expect(toast).toHaveText('Project saved');
  });

  test('should match visual snapshot of the editor', async ({ page }) => {
    // Wait for the editor to be stable
    await expect(page.getByTestId('code-editor')).toBeVisible();
    
    // Take a screenshot and compare it with the baseline
    await expect(page).toHaveScreenshot('editor-layout.png', {
      mask: [page.getByTestId('username-display')], // Mask dynamic parts
      threshold: 0.2
    });
  });

  test('should be responsive on mobile viewport', async ({ page }) => {
    // Set viewport to mobile size
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Verify that the navbar brand is still visible
    await expect(page.getByTestId('navbar')).toBeVisible();
    
    // Verify that the layout stacks (editor section should take full width)
    const editorSection = page.locator('.editor-section-p5');
    const box = await editorSection.boundingBox();
    expect(box?.width).toBeCloseTo(375, 1);
  });
});
