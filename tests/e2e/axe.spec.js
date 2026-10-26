import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const wcagTags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'];

test.beforeEach(async ({ page }) => {
  await page.route('https://reqres.in/api/users**', (route) => route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ data: [] }),
  }));
});

async function expectNoAccessibilityViolations(page, state) {
  const results = await new AxeBuilder({ page })
    .withTags(wcagTags)
    .analyze();

  const summary = results.violations
    .map(({ id, impact, help, nodes }) => {
      const affectedNodes = nodes
        .map(({ target, failureSummary }) => (
          `  - ${target.join(', ')}\n${failureSummary ?? ''}`
        ))
        .join('\n');

      return `[${impact}] ${id}: ${help}\n${affectedNodes}`;
    })
    .join('\n\n');

  expect(
    results.violations,
    `axe found accessibility violations in the ${state} state:\n${summary}`,
  ).toEqual([]);
}

test('home page and interactive states have no WCAG 2.1 A/AA violations', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('.app-shell')).toBeVisible();
  await expectNoAccessibilityViolations(page, 'initial');

  const readingModeToggle = page.getByRole('button', { name: 'Modo de leitura' });
  await readingModeToggle.click();
  await expect(readingModeToggle).toHaveAttribute('aria-pressed', 'true');
  await expect(page.locator('.app-shell')).toHaveClass(/reading-mode/);
  await expectNoAccessibilityViolations(page, 'reading mode enabled');

  await page.setViewportSize({ width: 320, height: 800 });
  await expect(page.locator('.app-shell')).toHaveAttribute('data-device', 'mobile');
  await expect.poll(() => page.evaluate(
    () => document.documentElement.scrollWidth <= document.documentElement.clientWidth,
  )).toBe(true);
  await expectNoAccessibilityViolations(page, 'mobile reading mode');

  await page.getByRole('link', { name: 'Atividade' }).click();
  await expect(page).toHaveURL(/#activity$/);
  const activitySection = page.locator('.activity-center');
  await expect(activitySection).toBeVisible();
  await expect(activitySection).toHaveCSS('opacity', '1');
  await expect(page.locator('.activity-toolbar button[aria-pressed="true"]'))
    .toHaveCSS('color', 'rgb(238, 234, 255)');
  await expectNoAccessibilityViolations(page, 'activity section');

  await page.getByRole('button', { name: 'Abrir notificações' }).click();
  const notificationPanel = page.locator('#notification-panel');
  await expect(notificationPanel).toBeVisible();
  await expect(notificationPanel).toHaveCSS('opacity', '1');
  await expectNoAccessibilityViolations(page, 'notification panel open');
});
