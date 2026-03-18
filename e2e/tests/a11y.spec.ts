import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

/**
 * Accessibility (a11y) Tests
 *
 * These tests verify that the p5.js editor prototype is accessible to users
 * with disabilities — covering screen readers, keyboard navigation, color
 * contrast, and ARIA roles.
 *
 * Tool: @axe-core/playwright — runs WCAG 2.1 AA rules automatically in the browser.
 *
 * How to run only accessibility tests:
 *   npx playwright test a11y.spec.ts
 */

test.describe('Accessibility - p5.js Editor', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByTestId('code-editor')).toBeVisible();
  });

  // ─── Automated axe-core Scans (WCAG 2.1 AA) ─────────────────────────────

  test('homepage has no automatically detectable accessibility violations', async ({ page }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      // Exclude the iframe preview — it runs sandboxed sketch code we don't control
      .exclude('iframe[title="sketch preview"]')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  test('login modal has no accessibility violations when open', async ({ page }) => {
    // Trigger modal
    await page.getByLabel('Save project').click();
    await expect(page.getByTestId('login-modal')).toBeVisible();

    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .include('[data-testid="login-modal"]')
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });

  // ─── ARIA Labels & Roles ─────────────────────────────────────────────────

  test('toolbar action buttons have descriptive aria-labels', async ({ page }) => {
    // All interactive buttons must have accessible names for screen readers
    await expect(page.getByRole('button', { name: 'Run sketch' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Stop sketch' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'Save project' })).toBeVisible();
  });

  test('code editor has an accessible name', async ({ page }) => {
    // The editor textarea must be labelled so screen readers announce it
    const editor = page.getByRole('textbox', { name: 'Code Editor' });
    await expect(editor).toBeVisible();
  });

  test('navbar has correct landmark role', async ({ page }) => {
    // Navbar should render as <nav> or have role="navigation" for screen readers
    const navbar = page.getByRole('navigation');
    await expect(navbar).toBeVisible();
  });

  test('login modal is announced to screen readers when triggered', async ({ page }) => {
    await page.getByLabel('Save project').click();
    const modal = page.getByTestId('login-modal');
    await expect(modal).toBeVisible();

    // The modal heading ("Sign In Required") must be present and readable
    await expect(modal.getByRole('heading', { name: 'Sign In Required' })).toBeVisible();
  });

  // ─── Keyboard Navigation ─────────────────────────────────────────────────

  test('user can tab through all toolbar buttons without a mouse', async ({ page }) => {
    // Start from the body and tab through interactive elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Tab');

    // The Run button should be reachable via keyboard
    const focused = page.getByLabel('Run sketch');
    await expect(focused).toBeFocused();
  });

  test('user can activate Run button with keyboard (Enter key)', async ({ page }) => {
    // Focus the Run button and press Enter — same as clicking it
    await page.getByLabel('Run sketch').focus();
    await page.keyboard.press('Enter');

    // Verify the sketch started (console output updated)
    const consoleOutput = page.getByTestId('console-output');
    await expect(consoleOutput).toContainText('Running sketch...');
  });

  test('Escape key closes the login modal', async ({ page }) => {
    await page.getByLabel('Save project').click();
    await expect(page.getByTestId('login-modal')).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(page.getByTestId('login-modal')).not.toBeVisible();
  });

  // ─── Color Contrast ──────────────────────────────────────────────────────

  test('toolbar buttons meet WCAG color contrast requirements', async ({ page }) => {
    // axe-core checks contrast automatically — we target just the toolbar here
    const results = await new AxeBuilder({ page })
      .withTags(['wcag2aa'])
      .include('.toolbar-main')
      .analyze();

    // Filter only contrast-related violations
    const contrastViolations = results.violations.filter(v => v.id === 'color-contrast');
    expect(contrastViolations).toEqual([]);
  });

  // ─── Focus Visibility ────────────────────────────────────────────────────

  test('focused button has a visible focus ring (not hidden by CSS)', async ({ page }) => {
    const runButton = page.getByLabel('Run sketch');
    await runButton.focus();

    // Check the button is focused (outline must not be `outline: none` in CSS)
    const outlineStyle = await runButton.evaluate(el => getComputedStyle(el).outline);
    // A visible focus ring will never be "0px none rgba(0, 0, 0, 0)" or empty
    expect(outlineStyle).not.toBe('0px none rgba(0, 0, 0, 0)');
    expect(outlineStyle).not.toBe('');
  });

  // ─── Mobile Accessibility ─────────────────────────────────────────────────

  test('no accessibility violations on mobile viewport (375px)', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.reload();
    await expect(page.getByTestId('code-editor')).toBeVisible();

    const results = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa'])
      .exclude('iframe[title="sketch preview"]')
      .analyze();

    expect(results.violations).toEqual([]);
  });
});
