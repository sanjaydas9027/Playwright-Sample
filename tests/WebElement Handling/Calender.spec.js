const { test, expect } = require("@playwright/test");
test("calender handling", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");

  const month = "9";
  const date = "15";
  const year = "2027";
  await page.locator(".react-date-picker__inputGroup").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.locator(".react-calendar__navigation__label").click();
  await page.getByText(year).click();
  let monthsList = await page
    .locator(".react-calendar__year-view__months__month")
    .allTextContents();
  console.log(monthsList[month - 1]);

  await page
    .locator(".react-calendar__year-view__months__month")
    .nth(month - 1)
    .click();
  let dayList = await page
    .locator(
      ".react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth)"
    )
    .allTextContents();

  console.log(dayList);
  await page
    .locator(
      ".react-calendar__month-view__days__day:not(.react-calendar__month-view__days__day--neighboringMonth)"
    )
    .nth(date - 1)
    .click();
    const expectedList = [month,date,year];
  const inputs = await page.locator(".react-date-picker__inputGroup input");
  for (let index = 0; index < inputs.length; index++) {
    const value = inputs[index].getAttribute("value");
    console.log(value)
    expect(value).toEqual(expectedList[index]);
  }
  await page.pause();
});
