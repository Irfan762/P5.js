import { test, expect } from '@playwright/test';

/**
 * Visual Regression Tests
 *
 * These tests capture screenshots of the p5.js editor UI and compare them
 * against stored baseline snapshots. Any unintended visual change (layout
 * shifts, color changes, missing elements) will cause a test failure.
 *
 * How to update baselines after an intentional UI change:
 *   npx playwright test visual.spec.ts --update-snapshots
 */

test.describe('Visual Regression - p5.js Editor', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    // Wait for the editor to be fully loaded before taking a screenshot
    await expect(page.getByTestId('code-editor')).toBeVisible();
  });

  // ─── Full Page Layout ────────────────────────────────────────────────────

  test('full editor layout matches baseline snapshot', async ({ page }) => {
    await expect(page).toHaveScreenshot('full-editor-layout.png', {
      // Mask the project name (editable, changes per session) to avoid false failures
      mask: [page.locator('.toolbar-project-name')],
      // Allow up to 0.2% pixel difference for anti-aliasing
      maxDiffPixelRatio: 0.002,
    });
  });

  // ─── Individual Component Snapshots ─────────────────────────────────────

  test('navbar component matches baseline snapshot', async ({ page }) => {
    const navbar = page.getByTestId('navbar');
    await expect(navbar).toHaveScreenshot('navbar-component.png');
  });

  test('toolbar buttons match baseline snapshot', async ({ page }) => {
    const toolbar = page.locator('.toolbar-main');
    await expect(toolbar).toHaveScreenshot('toolbar-buttons.png', {
      mask: [page.locator('.toolbar-project-name')],
    });
  });

  test('code editor panel matches baseline snapshot', async ({ page }) => {
    const editorPanel = page.locator('.editor-section-p5');
    await expect(editorPanel).toHaveScreenshot('editor-panel.png');
  });

  test('preview panel matches baseline snapshot', async ({ page }) => {
    const previewPanel = page.locator('.preview-section-p5');
    await expect(previewPanel).toHaveScreenshot('preview-panel.png');
  });

  // ─── State-Based Snapshots ───────────────────────────────────────────────

  test('login modal appearance matches baseline snapshot', async ({ page }) => {
    // Trigger the login modal by clicking Save without being logged in
    await page.getByLabel('Save project').click();
    const modal = page.getByTestId('login-modal');
    await expect(modal).toBeVisible();

    await expect(modal).toHaveScreenshot('login-modal.png');
  });

  test('toast notification appearance matches baseline snapshot', async ({ page }) => {
    // Simulate logged-in state to trigger autosave toast
    await page.evaluate(() => localStorage.setItem('p5_user', 'test_user'));
    await page.reload();
    await expect(page.getByTestId('code-editor')).toBeVisible();

    // Type in editor to trigger autosave after 5s
    const editor = page.locator('.CodeMirror-p5');
    await editor.fill('// visual regression autosave trigger');

    const toast = page.getByTestId('toast-notification');
    await expect(toast).toBeVisible({ timeout: 10000 });

    await expect(toast).toHaveScreenshot('toast-notification.png');
  });

  // ─── Mobile Viewport Snapshot ────────────────────────────────────────────

  test('editor layout on mobile viewport (375px) matches baseline', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await expect(page.getByTestId('code-editor')).toBeVisible();

    await expect(page).toHaveScreenshot('mobile-editor-layout.png', {
      mask: [page.locator('.toolbar-project-name')],
    });
  });

  // ─── Theme Consistency ───────────────────────────────────────────────────

  test('dark sidebar panel matches baseline snapshot', async ({ page }) => {
    const sidebar = page.locator('.sidebar-p5');
    await expect(sidebar).toHaveScreenshot('sidebar-dark-theme.png');
  });
});
