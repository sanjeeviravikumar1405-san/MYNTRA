# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: amazeiphone17.spec.js >> Find maximum rating and Add to Cart
- Location: tests\amazeiphone17.spec.js:4:5

# Error details

```
Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://www.amazon.in/
Call log:
  - navigating to "https://www.amazon.in/", waiting until "load"

```

# Test source

```ts
  1  | 
  2  | import { test } from '@playwright/test';
  3  | 
  4  | test('Find maximum rating and Add to Cart', async ({ page }) => {
  5  | 
> 6  |     await page.goto('https://www.amazon.in');
     |                ^ Error: page.goto: net::ERR_INTERNET_DISCONNECTED at https://www.amazon.in/
  7  | 
  8  |     // Step 1: Search iPhone 17 Pro
  9  |     await page.locator('#twotabsearchtextbox').fill('iPhone 17 Pro');
  10 |     await page.keyboard.press('Enter');
  11 | 
  12 |     // Step 2: Wait for search results
  13 |     await page.waitForSelector('//div[@data-component-type="s-search-result"]');
  14 | 
  15 |     // Step 3: Get iPhone 17 Pro product cards (exclude Pro Max)
  16 |     const products = page.locator(
  17 |         '//div[@data-component-type="s-search-result"][.//span[contains(text(),"iPhone 17 Pro") and not(contains(text(),"Pro Max"))]]'
  18 |     );
  19 | 
  20 |     const count = await products.count();
  21 |     let maxRating = 0;
  22 |     let maxProduct = null;
  23 | 
  24 |     // Step 4: Find the maximum rating
  25 |     for (let i = 0; i < count; i++) {
  26 |         const product = products.nth(i);
  27 | 
  28 |         const ratingText = await product.locator(
  29 |             'span.a-icon-alt'
  30 |         ).first().textContent().catch(() => '');
  31 | 
  32 |         const match = ratingText?.match(/\d+(\.\d+)?/);
  33 |         const rating = match ? Number(match[0]) : 0;
  34 | 
  35 |         if (rating > maxRating) {
  36 |             maxRating = rating;
  37 |             maxProduct = product;
  38 |         }
  39 |     }
  40 | 
  41 |     // Step 5: Print maximum rating
  42 |     if (maxProduct && maxRating > 0) {
  43 |         console.log('Maximum Rating:', maxRating);
  44 | 
  45 |         // Step 6: Find and click Add to Cart
  46 |         const addToCart = maxProduct.locator(
  47 |             'input[aria-label="Add to cart"], button:has-text("Add to cart")'
  48 |         );
  49 | 
  50 |         if (await addToCart.count() > 0) {
  51 |             await addToCart.first().click();
  52 |             console.log('Add to Cart clicked');
  53 |         } else {
  54 |             console.log('Add to Cart button not found in search result');
  55 |         }
  56 |     } else {
  57 |         console.log('No ratings found');
  58 |     }
  59 | });
  60 | 
```