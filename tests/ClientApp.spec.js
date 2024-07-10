const { test, expect } = require("@playwright/test");
test("Client app login page", async ({ page }) => {
  page.goto("https://rahulshettyacademy.com/client/");

  await page.locator("#userEmail").fill("anshika@gmail.com");
  await page.locator("#userPassword").fill("admin");

  await page.locator('[value="Login"]').click();
  await page.waitForLoadState("networkidle");
  await expect(page.locator('//button[text()=" HOME "]')).toBeVisible;

  const products = page.locator(".card-body");
  const productName = "ADIDAS ORIGINAL";
  let items = await page.locator(".card-body b").allTextContents();
  console.log(items);
  const count = await products.count();
  for (let i = 0; i < count; ++i) {
    if ((await products.nth(i).locator("b").textContent()) === productName) {
      //add to cart
      await products.nth(i).locator("text= Add To Cart").click();
      break;
    }
  }

  await page.locator('//button[@routerlink="/dashboard/cart"]').click();

  let cartItem = await page.locator('//div[@class="cartSection"]/h3').first();
  console.log(await cartItem.textContent());
  const bool = await cartItem.isVisible();
  expect(bool).toBeTruthy();
  await page.locator('//button[text()="Checkout"]').click();
  let orderId = "668d70adae2afd4c0b1dd330";
  // web tables
  await page.locator('//button[contains(text(),"ORDERS")]').click();
  const rows = await page.locator("tbody tr");
  for (let i = 0; i < (await rows.count()); i++) {
    const rowOrderId = await rows.nth(i).locator("th").textContent();
    if (rowOrderId.includes(orderId)) {
      await rows.nth(i).locator("button").first().click();
      break;
    }
  }

  let res = await page
    .locator('//div/small[text()="Order Id"]/following-sibling::div')
    .textContent();
  console.log(res);
  await expect(res).toEqual(orderId);
});
