import { test } from "@playwright/test";
test('window handling', async ({ context }) => {
await page.goto('https://www.reliancedigital.in/');
await page.locator('//a[@aria-label="open Tablets"]').click();








})