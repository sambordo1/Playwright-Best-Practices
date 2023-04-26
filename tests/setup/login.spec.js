import { test, expect } from '@playwright/test';
import { authFile }  from '../../playwright.config.js';

test('login and save session', async ({ page }) => {
  await page.goto('/login');
  await page.getByLabel('Username *').click();
  await page.getByLabel('Username *').fill(process.env.USERNAME);
  await page.getByLabel('Password *').click();
  await page.getByLabel('Password *').fill(process.env.PASSWORD);
  await page.locator('mat-card-actions').getByRole('button', { name: 'Login' }).click();
  await page.waitForLoadState('networkidle');

  await page.context().storageState({path: authFile});

});