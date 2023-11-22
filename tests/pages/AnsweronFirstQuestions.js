export class AnswerOnFirstCustomerPage {
    constructor(page) {
        this.page = page;
    }

    async openAllcarets() {
        const questions = await this.page.locator('.slds-accordion__summary').all();
        for (const question of questions) {
          await question.click()
        }
        console.log('==>> questions: ', questions);
    } 
     
}

   
