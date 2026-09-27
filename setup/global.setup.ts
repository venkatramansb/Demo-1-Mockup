import { test as GsetUp } from '@playwright/test';

GsetUp('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/');
});
