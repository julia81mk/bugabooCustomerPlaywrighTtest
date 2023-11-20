export class AnsweronFirstCustomerPage {
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

   
// export async function openAllcarets() {
//     const questions = await page.locator('.slds-accordion__summary').all();
//     for (const question of questions) {
//       await question.click()
//     }
//     console.log('==>> questions: ', questions);
// } 

// function openAllcarets(arrayCarets){
//     const caretElement = await page.locator('.slds-button__icon').all();
//     for (const item of  arrayCarets) {
//          item.click()
//     }
// }

 // const questions = await page.locator('.slds-accordion__summary').all();
    // for (const question of questions) {
    //   await question.click()
    // }
    // console.log('==>> questions: ', questions);