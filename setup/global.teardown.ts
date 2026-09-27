import { test as GTearDown } from '@playwright/test';

GTearDown('has title', async ({ page }) => {
  await page.goto('https://playwright.dev/signout');
});


//toconnectDB
//toTakeScreenShot