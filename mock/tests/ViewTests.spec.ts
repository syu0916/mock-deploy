import { test, expect } from '@playwright/test';


// If you needed to do something before every test case...
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:8000/');

  })


// view should return an error if no datset is loaded
test('on calling view without calling load', async ({ page }) => {
  
  await expect(page.getByLabel('Command input')).toBeVisible()

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('view');
  await page.getByLabel('submit-button').click();

  await expect(page.getByLabel('view-error')).
      toContainText('No dataset has been loaded at this time')
})

// view  should also return an error if there is a faulty dataset loaded
// load reuqires a valid file path:
test('on calling view with a faulty response map', async ({page}) => {
  await expect(page.getByLabel('Command input')).toBeVisible()

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv no');
  await page.getByLabel('submit-button').click();

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('view');
  await page.getByLabel('submit-button').click();

  await expect(page.getByLabel('view-error')).
      toContainText('No dataset has been loaded at this time')
})

// calling view after a successful load has been called
test('on calling view with a valid file path', async ({page}) => {
  await expect(page.getByLabel('Command input')).toBeVisible()
  
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv yes');
  await page.getByLabel('submit-button').click();

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('view');
  await page.getByLabel('submit-button').click();

  await expect(page.getByLabel('view-response')).
      toBeVisible()

  // table headers are visible?
  await expect(page.getByText('one')).toHaveCount(2)
  await expect(page.getByText('two')).toHaveCount(2)
  await expect(page.getByText('three')).toHaveCount(2)
  await expect(page.getByText('four')).toHaveCount(2)
  await expect(page.getByText('five')).toHaveCount(2)
})

// calling view on a file with no headers; should just output a table with indeces
test('on calling view on a file with no headers', async ({ page }) => {
    await expect(page.getByLabel('Command input')).toBeVisible()
  
    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('load_csv no_header');
    await page.getByLabel('submit-button').click();

    await expect(page.getByText('success: {"headers":["0","1","2","3","4"],"body":[["10","20","30","40","50"],["100","200","300","400","500"]]}')).
        toBeVisible()

    await page.getByLabel('Command input').click();
    await page.getByLabel('Command input').fill('view');
    await page.getByLabel('submit-button').click();

    await expect(page.getByText('1')).toHaveCount(5)
    await expect(page.getByText('2')).toHaveCount(4)
    await expect(page.getByText('3')).toHaveCount(4)
    await expect(page.getByText('4')).toHaveCount(4)
    await expect(page.getByText('5')).toHaveCount(3)

  });


