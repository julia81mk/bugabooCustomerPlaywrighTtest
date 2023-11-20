const { test, expect } = require('@playwright/test');

const { default: CustomerContactMaimPage } = require('../tests/pages/CustomerContactMaimPage.js');
const { createRandomData } = require('../tests/helpers/cretateRundomData.js');
const { FirstCustomerPage } = require('../tests/pages/FirstQuestionPage.js');
const { checkQuestionsEquality } = require('../tests/helpers/checkQuestionsEquality.js');
const { expected } = require('../tests/testdata/templateFirstqueationarr.js');
const { AnsweronFirstCustomerPage } = require('../tests/pages/AnsweronFirstQuestions.js')


test.describe("Some page test", () => {
  let customerContactPage;
  let page;
  let firstCustomerPage;
  let answeronFirstCustomerPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    customerContactPage = new CustomerContactMaimPage(page);
    firstCustomerPage = new FirstCustomerPage(page);
    answeronFirstCustomerPage = new AnsweronFirstCustomerPage(page)

  });

  test.beforeEach(async () => {
    await page.goto('https://service.bugaboo.com/s/consumer-contact?selectedItem=Consumer_Contact_Form__c&language=en_US');
    await customerContactPage.acceptAllCokiesBtn.click();
    await customerContactPage.startqustiondrpd.click();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('has title', async () => {
    await customerContactPage.firstQustion.click();

    await page.locator('.slds-accordion__summary-content', { hasText: 'How can I return a Pretty Perfect product?' }).waitFor({ state: 'visible', timeout: 5000 });
    // const allQustions = await page.locator('.slds-accordion__summary-content').all(); -return array of locators
    const accordionItem = await page.locator('.slds-accordion__summary-content', { hasText: 'How can I return a Pretty Perfect product?' });
    expect(accordionItem).toBeVisible();
    const allQustions = await page.locator('.slds-accordion__summary-content').allTextContents();
    console.log('==>> allQustions: ', allQustions);
    // const questionsTexts = [];
    // for (const question of allQustions) {
    //   questionsTexts.push(await question.textContent());
    // } insteand of const allQustions = await page.locator('.slds-accordion__summary-content').allTextContents();

    await answeronFirstCustomerPage.openAllcarets()


    expect(checkQuestionsEquality(allQustions, expected)).toBeTruthy();// check that  all question is display according to expected array
    // await page.screenshot({ path: 'test/testdata' + 'FirstQuestion.png', fullPage: true }); - make a screenshort
    expect(await page.screenshot({fullPage: true} )).toMatchSnapshot('testdataFirstQuestion.png');

    // expect(await page.screenshot()).toMatchSnapshot('testdataFirstQuestion.png');

    await customerContactPage.nextButton.click();
    const locator = page.locator('#input-label-103');
    expect(locator).toBeVisible();
  });

  test('fill delivery form', async () => {
    await customerContactPage.fifthQustion.click();
    await customerContactPage.nextButton.click();

    await firstCustomerPage.fileUpload()

    await firstCustomerPage.fillForm()
    await firstCustomerPage.errorCapcha.waitFor({ state: "visible", timeout: 5000 });
    await expect(firstCustomerPage.errorCapcha).toHaveText('Please complete the captcha');


    //const inputElement = page.locator('.iti__country-list>li[data-dial-code]');
    //const minLength = await inputElement.allTextContents('data-dial-code');

  });

});

