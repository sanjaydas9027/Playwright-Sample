const { test, expect } = require("@playwright/test");

test("popup validation", async ({ page }) => {
  await page.goto("http://www.rahulshettyacademy.com/AutomationPractice");
  //   page.goto("https://www.google.co.in/");
  //   page.goBack();
  //   page.goForward();

  await expect(page.locator("#displayed-text")).toBeVisible();
  await page.locator("#hide-textbox").click();
  await expect(page.locator("#displayed-text")).toBeHidden();

  // JavaScript Alert popup handling which is not inspectable
  await page.locator("#alertbtn").click();
  page.on("dialog", (dialog) => dialog.accept());
  await page.locator("#confirmbtn").click();
  page.on("dialog", (dialog) => dialog.dismiss());

  // hover
  await page.locator("#mousehover").hover();

  // handling frames

  const framepage = page.frameLocator("#courses-iframe");

  await framepage.locator('li a[href="learning-path"]:visible').click();
  let title = await framepage.locator(".inner-box h1").textContent();
  console.log(title);
  console.log(title.split(" ")[1]);
});
