import { test, expect } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';

const envPath = path.resolve(__dirname, '../env/.env.stage');

dotenv.config({
    path: envPath
});

test('01 - Login and save auth-sh-user', async ({ page }) => {

    await page.goto(
        'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login'
    );

    await page.getByPlaceholder('Username').fill('Admin');

    await page.getByPlaceholder('Password').fill('admin123');

    await page.getByRole('button', { name: 'Login' }).click();

    await expect(
        page.getByAltText('client brand banner')
    ).toBeVisible();

    await expect(page).toHaveTitle('OrangeHRM');

    // Wait until auth-sh-user is available
    await page.waitForFunction(() => {
        return localStorage.getItem('auth-sh-user') !== null;
    });

    // Get value of auth-sh-user
    const authShUser = await page.evaluate(() => {
        return localStorage.getItem('auth-sh-user');
    });

    console.log('auth-sh-user:', authShUser);

    if (!authShUser) {
        throw new Error('auth-sh-user was not found in localStorage');
    }

    // Read existing .env.stage
    let envContent = fs.readFileSync(envPath, 'utf-8');

    // Save/update AUTH_SH_USER
    if (/^AUTH_SH_USER=.*/m.test(envContent)) {

        envContent = envContent.replace(
            /^AUTH_SH_USER=.*/m,
            `AUTH_SH_USER=${authShUser}`
        );

    } else {

        envContent += `\nAUTH_SH_USER=${authShUser}\n`;
    }

    fs.writeFileSync(envPath, envContent);

    console.log('AUTH_SH_USER saved successfully to .env.stage');
});