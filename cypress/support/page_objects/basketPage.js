function extractNumber(value) {
    // If the value starts with "x", remove it and convert the remaining part to a number
    if (value.startsWith('x')) {
        return Number(value.replace('x ', ''));
    }
    
    // If the value starts with "£", remove it and convert the remaining part to a number
    if (value.startsWith('£')) {
        return parseFloat(value.replace('£', ''));
    }
    // If none of the conditions are met, return 0
    return 0;
}

// Function to get the quantities as a promise
function getQuantities() {
    return new Cypress.Promise((resolve) => {
        const quantities = [];
        cy.get('.list-group-item.lh-condensed small').each(($small) => {
            quantities.push($small.text().trim());
        }).then(() => {
            resolve(quantities);
        });
    });
}

// Function to get the prices as a promise
function getPrices() {
    return new Cypress.Promise((resolve) => {
        const prices = [];
        cy.get('.list-group-item.lh-condensed span').each(($span) => {
            prices.push($span.text().trim());
        }).then(() => {
            resolve(prices);
        });
    });
}

async function getTotal(){
    // Wait for quantities and prices to be retrieved from their respective sources
    const quantities = await getQuantities()
    const prices = await getPrices()

    let total = 0;
    // Iterate through each quantity and corresponding price
    for (let i = 0; i < quantities.length; i++) {
        // Extract numeric value from the quantity and price strings
        const quantity = extractNumber(quantities[i]);
        const price = extractNumber(prices[i]);

        // Accumulate the total price by multiplying quantity and price
        total += quantity * price;
    }

    return total
}

async function verifyTotalPriceEquals() {
    // Await the result of getTotal() to get the resolved value
    const totalPriceExpected = await getTotal();
    
    cy.log("Total Price Expected: " + totalPriceExpected);

    // Ensure Cypress waits for the asynchronous operations to complete
    cy.get('.list-group-item strong').last().should(($strong) => {
        expect(extractNumber($strong.text().trim())).to.equal(totalPriceExpected);
    });
}

async function verifyTotalPriceNotEquals() {
    // Await the result of getTotal() to get the resolved value
    const totalPriceExpected = await getTotal();
    
    cy.log("Total Price Expected: " + totalPriceExpected);

    // Ensure Cypress waits for the asynchronous operations to complete
    cy.get('.list-group-item strong').last().should(($strong) => {
        expect(extractNumber($strong.text().trim())).not.to.equal(totalPriceExpected);
    });
}

function verifyAndClickRadioButton(radioButtonId) {
    cy.get(radioButtonId).then(($radioButton) => {
       // Check if the radio button is checked
        if (!$radioButton.prop('checked')) {
            // If not checked, click on it
            cy.wrap($radioButton).click({force: true})
      }
    })
}

export class BasketPage {

    verifySweetsItemIsPresent(itemName) {
        cy.get('#basketItems').then(item => {
            cy.wrap(item)
                .contains(itemName).should('be.visible');
        })
    }

    verifyTotalPriceEquality() {
        verifyTotalPriceEquals()
    }

    verifyTotalPriceInequality() {
        verifyTotalPriceNotEquals()
    }

    chooseCollect(){
        verifyAndClickRadioButton('#exampleRadios1')
    }

    chooseStandartShipping(){
        verifyAndClickRadioButton('#exampleRadios2')
    }

    fillForm(fixtureName){
        cy.fixture(fixtureName).then((data)=>{
            this.data=data;
        })

        cy.get('.needs-validation').then(item => {
            const billingAddress = this.data.billingAddress[0]

            cy.get(item).find('[for="firstName"]').next('input').type(billingAddress.firstname)
            cy.get(item).find('[for="lastName"]').next('input').type(billingAddress.lastname)
            cy.get(item).find('#email').type(billingAddress.email)
            cy.get(item).find('#address').type(billingAddress.mainaddress)
            cy.get(item).find('#address2').type(billingAddress.optionaladdress)
            cy.get(item).find('#country').select(billingAddress.country)
            cy.get(item).find('#city').select(billingAddress.city)
            cy.get(item).find('#zip').type(billingAddress.zip)


            const payment = this.data.payment[0]

            cy.get(item).find('#cc-name').type(payment.namecard)
            cy.get(item).find('#cc-number').type(payment.creditcardnumber)
            cy.get(item).find('#cc-expiration').type(payment.expiration)
            cy.get(item).find('#cc-cvv').type(payment.cvv)
        })
    }

    clickCheckoutButton(){
        cy.get('.needs-validation').then(button => {
            cy.wrap(button).submit()
        })
    }
}

export const basketPage = new BasketPage()