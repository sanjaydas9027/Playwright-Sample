// GetByLabel, GetByPlaceholder etc

const { test, expect } = require("@playwright/test");

test.beforeEach(async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/angularpractice/");
});

test.only("Angular page test", async ({ page }) => {
  // directly check checkbox  using it's  label as reference
  await page.getByLabel("Check me out if you Love IceCreams!").click();
  const status = await page.locator("#exampleCheck1").isChecked();
  console.log("check box is checked: ", status);

  // check checkbox of Employed using label Employed

  await page.getByLabel("Employed").click();
  await expect(page.getByLabel("Employed")).toBeChecked();
  // select an option from dropdown with getBy label

  await page.getByLabel("Gender").selectOption("Female");
  let text = await page.locator("#exampleFormControlSelect1").textContent();
  console.log(text);
/*
not work 
await page.getByLabel("Name").fill("Sanjay");
*/



});
