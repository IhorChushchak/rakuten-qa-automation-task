import { homePage } from "../support/page_objects/homePage"
import { basketPage } from "../support/page_objects/basketPage"


describe('Sweet Shop Basket Tests', () => {

    beforeEach('Open application', () => {
      cy.openHomePage()
    })

    it('Verify selected items are in basket', () => {
      homePage.selectSweetsByName('Sherbert Discs')
      homePage.basketPage()
      basketPage.verifySweetsItemIsPresent('Sherbert Discs') 
      //Present issue in web app naming {Expected: Sherbert Discs, Actual: Sherbet Discs}
      //Current test will fail
    })

    it('Verify selected items are in basket', () => {
      homePage.selectSweetsByName('Bon Bons')
      homePage.selectSweetsByName('Sherbert Discs')
      homePage.selectSweetsByName('Sherbert Straws')
      homePage.basketPage()
      basketPage.verifyTotalPriceEquality()
      basketPage.chooseStandartShipping()
    })

  it('Verify selection of Standart Shipping changes Total in basket', () => {
      homePage.selectSweetsByName('Bon Bons')
      homePage.basketPage()
      basketPage.verifyTotalPriceEquality()
      basketPage.chooseStandartShipping()
      basketPage.verifyTotalPriceInequality()
  })

  it('Verify clicking Checkout button with all the filled data', () => {
      homePage.selectSweetsByName('Bon Bons')
      homePage.basketPage()
      basketPage.fillForm('form')
      basketPage.clickCheckoutButton()
  })

})