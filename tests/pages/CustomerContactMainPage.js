class StartCustomerPage {
    constructor(page) {
        this.page = page;
    }

    get acceptAllCokiesBtn(){
        return this.page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll[tabindex="0"]')
    }

    get startqustiondrpd(){
        return this.page.locator('#combobox-button-23') 
    }

    get firstQustion(){
        return this.page.locator('.slds-media__body [title="Delivery, Return or Refund"]')
    }
    get secondQustion(){
        return this.page.locator('.slds-media__body [title="Order or Payment Related"]')
    }

    get thirdQustion(){
        return this.page.locator('.slds-media__body [title="Product Registration"]')
    }

    get fourthQustion(){
        return this.page.locator('.slds-media__body [title="Maintenance and Usage"]')
    }

    get fifthQustion() {
        return this.page.locator('.slds-media__body [title="Delivery, Return or Refund"]') 
    }

    get sixthQustion(){
        return this.page.locator('.slds-media__body [title="General Question"]')
        
    }
    
    get nextButton(){
        return this.page.locator('.slds-button_brand[type="button"]')
    }
}

export default StartCustomerPage;
