import { test, expect } from '@playwright/test';

test('Go through category lists', async ({ page }) => {
  await page.goto('/');
  await page.locator('div').filter({ hasText: /^Biography$/ }).click();
  await page.locator('div').filter({ hasText: /^Fiction$/ }).click();
  await page.locator('div').filter({ hasText: /^Mystery$/ }).click();
  await page.locator('div').filter({ hasText: /^Fantasy$/ }).click();
  await page.getByText('Romance').click();
});