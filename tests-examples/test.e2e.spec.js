const { test, expect } = require('@playwright/test');

const { default: CustomerContactMaimPage } = require('../tests/pages/CustomerContactMainPage.js');
const { FirstCustomerPage } = require('../tests/pages/FirstQuestionPage.js');
const { checkQuestionsEquality } = require('../tests/helpers/checkQuestionsEquality.js');
const { expected } = require('../tests/testData/templateFirstqueationarr.js');
const { AnswerOnFirstCustomerPage } = require('../tests/pages/AnswerOnFirstQuestions.js')

test.describe("Some page test", () => {
  let customerContactPage;
  let page;
  let firstCustomerPage;
  let answerOnFirstCustomerPage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    customerContactPage = new CustomerContactMaimPage(page);
    firstCustomerPage = new FirstCustomerPage(page);
    answerOnFirstCustomerPage = new AnswerOnFirstCustomerPage(page);

  });

  test.beforeEach(async () => {
    await page.goto('https://service.bugaboo.com/s/consumer-contact?selectedItem=Consumer_Contact_Form__c&language=en_US');
    await customerContactPage.acceptAllCokiesBtn.click();
    await customerContactPage.startqustiondrpd.click();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Should have the list with answers on first quistion', async () => {
    await customerContactPage.firstQustion.click();
    await page.locator('.slds-accordion__summary-content', { hasText: 'How can I return a Pretty Perfect product?' }).waitFor({ state: 'visible', timeout: 5000 });
    const accordionItem = await page.locator('.slds-accordion__summary-content', { hasText: 'How can I return a Pretty Perfect product?' });
    expect(accordionItem).toBeVisible();
    const allQustions = await page.locator('.slds-accordion__summary-content').allTextContents();
    // console.log('==>> allQustions: ', allQustions);
    await answerOnFirstCustomerPage.openAllcarets();

    expect(checkQuestionsEquality(allQustions, expected)).toBeTruthy();// check that  all question is display according to expected array
    // await page.screenshot({ path: 'test/testdata' + 'FirstQuestion.png', fullPage: true }); - make a screenshort
    // expect(await page.screenshot({fullPage: true} )).toMatchSnapshot('testdataFirstQuestion.png');
    // expect(await page.screenshot()).toMatchSnapshot('testdataFirstQuestion.png');

    await customerContactPage.nextButton.click();
    await firstCustomerPage.orderNumber.waitFor({ state: "visible"});
    expect(firstCustomerPage.orderNumber).toBeVisible();

  });

  test('Should fill the delivery form from first question with valid value, exept the captcha', async () => {
    await customerContactPage.fifthQustion.click();
    await customerContactPage.nextButton.click();
    await firstCustomerPage.fileUpload();
    await firstCustomerPage.fillForm();
    await firstCustomerPage.errorCapcha.waitFor({ state: "visible", timeout: 2000 });
    await expect(firstCustomerPage.errorCapcha).toHaveText('Please complete the captcha');

    // await page.screenshot({ path: 'test/testdata' + 'FirstForm.png', fullPage: true }); - make a screenshort to make sure what all fields filled properly 
    // and only one error message about captcha is displayed
  });
});

