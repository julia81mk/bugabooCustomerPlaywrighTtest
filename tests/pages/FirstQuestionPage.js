const { createRandomData } = require('../helpers/cretateRandomData');
const { randomGenerator } = require('../helpers/randomGenerator');
const { fileUploadFile } = require('../testData/fileToUpload')

export class FirstCustomerPage {
    constructor(page) {
        this.page = page;
    }

    get orderNumber() {
        return this.page.locator('[name="Order_Number"]')
    }

    get itemCode() {
        return this.page.locator('[name="Item_Code"]')
    }

    get description() {
        return this.page.locator('.slds-textarea')
    }

    get firstName() {
        return this.page.locator('[name="First_Name"]')
    }

    get lastName() {
        return this.page.locator('[name="Last_Name"]')
    }

    get email() {
        return this.page.locator('[name="Email"]')
    }

    get emailConfirm() {
        return this.page.locator('[name="Verify_EMail"]')
    }

    get phonelistCode() {
        return this.page.locator('.iti__country-list>li[data-dial-code]')
    }

    get phone() {
        return this.page.locator('.slds-input[data-id="countryPhone"]')
    }

    get country() {
        return this.page.locator('[name="Country"]')
    }

    get uploadFile() {
        return this.page.locator('.slds-file-selector__body .slds-file-selector__button ')
    }

    get nextBtn() {
        return this.page.locator('.flow-button__NEXT')
    }

    async fillPhoneInput(phone) {
        await this.page.locator('.iti__flag-container').click();
        const counriesItems = await this.page.locator('.iti__country-list').locator('.iti__country').all();
        const randomPhoneIdx = randomGenerator(counriesItems)
        await counriesItems[randomPhoneIdx].click();
        await this.phone.fill(phone);
    }

    async fillCountyInput() {
        // Select random option.
        const options = await this.country.locator('option').all();
        const randomIdx = randomGenerator(options);
        const optionValue = await options[randomIdx].getAttribute("value");
        await this.country.selectOption(optionValue);

        // const selectedOption = await this.country.evaluate(sel => sel.options[sel.options.selectedIndex].textContent);
        // console.log('==>> selected: ', selectedOption);
    }

    get errorCapcha() {
        return this.page.locator('.errorContent>[part="formatted-rich-text"]');
    }

    async fileUpload() {
        await this.page.waitForSelector('.slds-file-selector__body .slds-file-selector__button');
        await this.uploadFile.click();
        await this.uploadFile.setInputFiles(fileUploadFile);
        await this.page.getByRole('button', { name: /done/i }).click();
    }

    async fillForm() {
        const formData = createRandomData();
        await this.orderNumber.click();
        await this.orderNumber.fill(formData.orderItemNumber);
        await this.itemCode.click();
        await this.itemCode.fill(formData.orderItemNumber);
        await this.description.click();
        await this.description.fill(formData.description);
        await this.firstName.click();
        await this.firstName.fill(formData.firstName);
        await this.lastName.click();
        await this.lastName.fill(formData.lastName);
        await this.email.click();
        await this.email.fill(formData.email);
        await this.emailConfirm.click();
        await this.emailConfirm.fill(formData.email);
        await this.phone.click();
        await this.fillPhoneInput(formData.phone);
        await this.fillCountyInput()
        await this.nextBtn.click();
    }
}
