function selectPage(pageName){
    cy.get('.navbar-nav').then(menu => {
        cy.wrap(menu)
            .contains(pageName)
            .click()
            })
}

export class HomePage{

    selectSweetsByName(sweetsName){
        cy.contains(sweetsName).then(card => {
            cy.wrap(card)
                .parents('.card')
                .contains('Add to Basket')
                .click()
                })
    }

    basketPage(){
        selectPage('Basket')

    }
}

export const homePage = new HomePage()