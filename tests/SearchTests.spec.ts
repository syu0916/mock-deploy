import { test, expect } from '@playwright/test';


// If you needed to do something before every test case...
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:8000/');

  })

// how does search interact with no dataset loaded in the first place?
// tests that iunimplemented commands return an error message:
test('on searching with no file loaded', async ({page}) => {

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search animal tiger');
    await expect(page.getByLabel('Command input')).toBeVisible()

    // click the button without anything filled
    await page.getByLabel('submit-button').click();
    await expect(page.getByLabel('search-error'))
        .toContainText("No dataset has been loaded at this time")
})

// on calling search on a faulty column in put
test('on calling search on a faulty column input', async ({ page }) => {
  
  await expect(page.getByLabel('Command input')).toBeVisible()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv zoo_filepath');
  await page.getByLabel('submit-button').click();

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search asdfdfdff penguin');
  await page.getByLabel('submit-button').click();


  await expect(page.getByLabel('search-error')).
      toContainText('No entries with column or search term were found in loaded csv.')
})


// on calling search on a faulty search input
test('on calling search on a faulty searched input', async ({ page }) => {
  
    await expect(page.getByLabel('Command input')).toBeVisible()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_csv zoo_filepath');
    await page.getByLabel('submit-button').click();
  
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search animal asdf ');
    await page.getByLabel('submit-button').click();
  
  
    await expect(page.getByLabel('search-error')).
        toContainText('No entries with column or search term were found in loaded csv.')
  })


test('on calling search on a valid search input', async ({ page }) => {

    await expect(page.getByLabel('Command input')).toBeVisible()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_csv zoo_filepath');
    await page.getByLabel('submit-button').click();
  
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search animal penguin');
    await page.getByLabel('submit-button').click();

    const table = await page.getByLabel('search-response');

    await expect(table).toBeVisible();
    await expect(page.getByLabel('search-response').getByText('penguin')).toHaveCount(3)
    await expect(page.getByLabel('search-response').getByText('krill')).toHaveCount(2)

})

test('on calling search on a valid search input Jeremy', async ({ page }) => {

    await expect(page.getByLabel('Command input')).toBeVisible()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_csv zoo_filepath');
    await page.getByLabel('submit-button').click();
  
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search animal tiger');
    await page.getByLabel('submit-button').click();

    
    // await expect(page.getByLabel('search-response').getByText('penguin')).toHaveCount(3)
    // await expect(page.getByLabel('search-response').getByText('krill')).toHaveCount(2)
    //document.querySelector("#root > div > div > div.repl-history > div:nth-child(5) > table > tbody > tr:nth-child(1) > td:nth-child(3)")
    const table = await page.getByLabel('search-response')
    await expect(table).toBeVisible

    // const list = page.locator("li:nth-child(2)")


  // Extract the content of the cell
    const body = table.locator("tbody")

    const rowJeremy = body.locator("tr:nth-child(1)");
    await expect(rowJeremy.locator("td:nth-child(3)")).toContainText("Jeremy")

    const rowSean = body.locator("tr:nth-child(2)");
    await expect(rowSean.locator("td:nth-child(3)")).toContainText("Sean")

    const rowSteak = body.locator("tr:nth-child(2)");
    await expect(rowSteak.locator("td:nth-child(5)")).toContainText("steak")


})

test('on calling search on a valid index-based column', async ({ page }) => {

    await expect(page.getByLabel('Command input')).toBeVisible()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_csv zoo_filepath');
    await page.getByLabel('submit-button').click();
  
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 3 penguin');
    await page.getByLabel('submit-button').click();

    const table = await page.getByLabel('search-response');

    await expect(table).toBeVisible();
    await expect(page.getByLabel('search-response').getByText('penguin')).toHaveCount(3)
    await expect(page.getByLabel('search-response').getByText('krill')).toHaveCount(2)

})

test('on calling search on an invalid index-based column', async ({ page }) => {

    await expect(page.getByLabel('Command input')).toBeVisible()
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_csv zoo_filepath');
    await page.getByLabel('submit-button').click();
  
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('search 5 penguin');
    await page.getByLabel('submit-button').click();

    const table = await page.getByLabel('search-error');

    await expect(table).toBeVisible();

})


  