import { test, expect } from '@playwright/test';


// If you needed to do something before every test case...
test.beforeEach(async ({page}) => {
    await page.goto('http://localhost:8000/');

  })

// tests that null commands just create new lines
test('onclicking submit with nothing loaded', async ({page}) => {
    await expect(page.getByLabel('Command input')).toBeVisible()

    // click the button without anything filled
    await page.getByLabel('submit-button').click();
    await expect(page.getByLabel('command-separator'))
        .toBeVisible()
})

// tests that iunimplemented commands return an error message:
test('onclicking submit on an unimplemented command', async ({page}) => {

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_c yes');
  await expect(page.getByLabel('Command input')).toBeVisible()
  // click the button without anything filled
  await page.getByLabel('submit-button').click();
  await expect(page.getByLabel('invalid-command-error'))
      .toContainText("invalid command")
  await expect(page.getByLabel('command-separator'))
      .toBeVisible()
})

test('on loading successfully, then error, then successful', async ({page}) => {
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

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv no');
  await page.getByLabel('submit-button').click();

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('view');
  await page.getByLabel('submit-button').click();

  await expect(page.getByLabel('view-error')).
  toContainText('No dataset has been loaded at this time')

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv yes');
  await page.getByLabel('submit-button').click();

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('view');
  await page.getByLabel('submit-button').click();

  await expect(page.getByLabel('view-response')).toHaveCount(2)

  // table headers are visible?
  await expect(page.getByText('one')).toHaveCount(4)
  await expect(page.getByText('two')).toHaveCount(4)
  await expect(page.getByText('three')).toHaveCount(4)
  await expect(page.getByText('four')).toHaveCount(4)
  await expect(page.getByText('five')).toHaveCount(4)
})

// doees the state reset or is the previous success still stored?
test('on loading successfully, then inputting an invalid command, then view', async ({page}) => {

  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv yes');
  await page.getByLabel('submit-button').click();

  // load a valid csv
  await expect(page.getByText('success: {"headers":["one","two","three","four","five"],"body":[["1","2","3","4","5"],'+
  '["10","20","30","40","50"],["100","200","300","400","500"]]}')).toBeVisible()


  // input a command that doesn't exist! a bad response will be different.
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_ dsfdf');
  await page.getByLabel('submit-button').click(); 

  // view the currently loaded object:
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('view');
  await page.getByLabel('submit-button').click(); 

  const table = page.getByLabel('view-response');

  await expect(table.getByText('one')).toBeVisible();
  await expect(table.getByText('two')).toBeVisible();
  await expect(table.getByText('three')).toBeVisible();
  await expect(table.getByText('four')).toBeVisible();
  await expect(table.getByText('five')).toBeVisible();
})

// how does search interact with different loaded files?
// doees the state reset or is the previous success still stored?
test('on loading successfully, then loading successfully, then search', async ({page}) => {


  // load a valid csv that isn't the searchable one
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv yes');
  await page.getByLabel('submit-button').click();

  await expect(page.getByText('success: {"headers":["one","two","three","four","five"],"body":[["1","2","3","4","5"],'+
  '["10","20","30","40","50"],["100","200","300","400","500"]]}')).toBeVisible()



  // loading a searchable csv
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv zoo_filepath');
  await page.getByLabel('submit-button').click();

  await expect(page.getByText('success: {"headers":["ID","Zoo Location","Name","Animal","Food"],'+
  '"body":[["01","Bronx Zoo","Jeremy","tiger","steak"],["02","San Francisco Zoo","Sean","tiger","steak"],'+
  '["03","San Francisco Zoo","John","human","tiger"],["04","Maryland Zoo","Lawn","penguin","krill"],'+
  '["05","Baltimore Zoo","Prawn","penguin","krill"],["06","New York Zoo","Drawn","penguin","sardines"]]}')).toBeVisible()


  // searching loaded table
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search animal tiger');
  await page.getByLabel('submit-button').click();


  const searchTable = await page.getByLabel('search-response')
  await expect(searchTable.getByText('tiger')).toHaveCount(2)
  await expect(searchTable.getByText('steak')).toHaveCount(2)
  
})


test('on trying to search without an error response map loaded', async ({page}) => {


  // load a valid csv that isn't the searchable one
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv no');
  await page.getByLabel('submit-button').click();

  await expect(page.getByText('error: "data/SimpleCsv/head.csv (No such file or directory)"')).toBeVisible()

  // searching loaded error table
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search 3 tiger');
  await page.getByLabel('submit-button').click();


  const searchTable = await page.getByLabel('search-response')
  await expect(page.getByText("No dataset has been loaded at this time.")).toBeVisible()
  
})

test('on loading in brief and searching in verbose', async ({page}) => {


  // load a valid csv that isn't the searchable one
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv zoo_filepath');
  await page.getByLabel('submit-button').click();

  await expect(page.getByText('success: {"headers":["ID","Zoo Location","Name","Animal","Food"],"body":[["01","Bronx Zoo","Jeremy","tiger","steak"],["02","San Francisco Zoo","Sean","tiger","steak"],["03","San Francisco Zoo","John","human","tiger"],["04","Maryland Zoo","Lawn","penguin","krill"],["05","Baltimore Zoo","Prawn","penguin","krill"],["06","New York Zoo","Drawn","penguin","sardines"]]}')).toBeVisible()

  // searching loaded error table
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode');
  await page.getByLabel('submit-button').click();
  

  // searching loaded error table
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('search 3 tiger');
  await page.getByLabel('submit-button').click();


  const searchTable = await page.getByLabel('search-response')
  
  await expect(page.getByText("Verbose output: command = search 3 tiger")).toBeVisible()
  await expect(searchTable.getByText('tiger')).toHaveCount(2)
  await expect(searchTable.getByText('steak')).toHaveCount(2)

  
  
})

test('on loading in brief and view in verbose', async ({page}) => {

  // set mode to verbose
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('load_csv zoo_filepath');
  await page.getByLabel('submit-button').click();


  // searching loaded error table
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('mode');
  await page.getByLabel('submit-button').click();

  // searching loaded error table
  await page.getByLabel('Command input').click();
  await page.getByLabel('Command input').fill('view');
  await page.getByLabel('submit-button').click();


  const viewTable = await page.getByLabel('view-response')
  await expect(page.getByText("Verbose output: command = view")).toBeVisible()
  await expect(viewTable.getByText('tiger')).toHaveCount(3)
  await expect(viewTable.getByText('steak')).toHaveCount(2)
  await expect(viewTable.getByText('penguin')).toHaveCount(3)
  
})


