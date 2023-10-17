import { test, expect } from '@playwright/test';


// If you needed to do something before every test case...
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:8000/');

  })


// load should produce an error message upon passing no arguments
test('on calling load with no arguments', async ({ page }) => {
  
  await expect(page.getByLabel('Command input')).toBeVisible()
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv');

  await page.getByLabel('submit-button').click();
  await expect(page.getByLabel('load-error')).
      toContainText('load_csv requires a valid filepath')
})

// load reuqires a valid file path:
test('on calling load without a valid (mocked) file path', async ({page}) => {
  await expect(page.getByLabel('Command input')).toBeVisible()

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv asdfasdf');

  await page.getByLabel('submit-button').click();
  await expect(page.getByLabel('load-error')).
      toContainText('load_csv requires a valid filepath')

})

// calling 'load_csv yes' should produce a valid reponse
test('on calling load with a valid file path', async ({page}) => {
  await expect(page.getByLabel('Command input')).toBeVisible()

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv yes');
  
  await page.getByLabel('submit-button').click();
  await expect(page.getByLabel('load-success-response')).
      toContainText('Response Type: success')

})

// calling 'load_csv yes' and then clicking mode should put it in verbose
test('on calling load with a valid (mocked) file path then clicking verbose', 
async ({page}) => {
  await expect(page.getByLabel('Command input')).toBeVisible()

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv yes');
  await page.getByLabel('submit-button').click();

  await expect(page.getByLabel('brief-label')).
      toContainText('Brief Output: ')
  
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode');
  await page.getByLabel('submit-button').click();

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv yes');
  await page.getByLabel('submit-button').click();

  await expect(page.getByLabel('verbose-label')).
  toContainText('Verbose Output: ')

  await expect(page.getByLabel('load-response-map')).
      toHaveCount(2)
})

// calling load_csv yes and then switching the mode twice
test('on calling load with a valid (mocked) file path then switch mode x2', 
async ({page}) => {
  await expect(page.getByLabel('Command input')).toBeVisible()

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv yes');
  await page.getByLabel('submit-button').click();

  await expect(page.getByLabel('brief-label')).
      toContainText('Brief Output: ')
  
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode');
  await page.getByLabel('submit-button').click();

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv yes');
  await page.getByLabel('submit-button').click();

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode');
  await page.getByLabel('submit-button').click();

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv yes');
  await page.getByLabel('submit-button').click();


  await expect(page.getByLabel('verbose-label')).
  toContainText('Verbose Output: ')

  await expect(page.getByLabel('brief-label')).toHaveCount(2)
  await expect(page.getByLabel('verbose-label')).toHaveCount(1)
  await expect(page.getByLabel('load-response-map')).
      toHaveCount(3)
})


// calling 'load_csv no' to test how error mocks are handled
test('on calling load with an error response', async ({ page }) => {
  await expect(page.getByLabel('Command input')).toBeVisible()

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv no');

  await page.getByLabel('submit-button').click();
  await expect(page.getByLabel('load-error-response')).
      toContainText('Response Type: error')
});

// calling 'load_csv no-header'
test('on calling load on a file with no header', async ({ page }) => {
  await expect(page.getByLabel('Command input')).toBeVisible()

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv no_header');
  await page.getByLabel('submit-button').click();

  await expect(page.getByText('success: {"headers":["0","1","2","3","4"],"body":[["10","20","30","40","50"],["100","200","300","400","500"]]}')).
      toBeVisible()
});