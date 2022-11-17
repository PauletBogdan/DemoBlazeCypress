import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import HomePage from "../pages/HomePage"
import CartPage from "../pages/CartPage";
import { waitOnRequest } from "./common";


Then('The user verifies that the total in the cart equals the products sum', () => {

    let totalValue = 0
    CartPage.productsTablePrice.each(($elem, index, $list) => {
        totalValue += parseInt($elem.text())
        if (index == $list.length - 1) {
            CartPage.totalAmount.should('have.text', totalValue.toString())
        }
    })

})

Then('The user deletes any of the products from the cart', (dataTable) => {

    dataTable.hashes().forEach(row => {
        CartPage.productsTableName.each(($element, index, $list) => {
            var text = $element.text()
            if (text.includes(row.productName)) {
                CartPage.productTableDeleteButton.eq(index).children().click();
                waitOnRequest('https://api.demoblaze.com/deleteitem', 'deleteItem')
                return false
            }
        })
    });
})

// Then('The user deletes one of the {string} product from the cart', (productName) => {

//     CartPage.productsTableName.each(($element, index, $list) => {
//         var text = $element.text()
//         if (text.includes(productName)) {
//             CartPage.productTableDeleteButton.eq(index).children().click();
//             waitOnRequest('https://api.demoblaze.com/deleteitem', 'deleteItem')
//             return false
//         }
//     })
// })

Then('The user deletes all of the {string} products from the cart', (productName) => {

    CartPage.productsTableName.each(($element, index, $list) => {
        var text = $element.text()
        if (text.includes(productName)) {
            CartPage.productTableDeleteButton.eq(index).children().click();
            waitOnRequest('https://api.demoblaze.com/deleteitem', 'deleteItem')
        }
    })
})

Then('The user deletes all the products from the cart', (productName) => {

    CartPage.productsTableName.each(($element, index, $list) => {
        CartPage.productTableDeleteButton.eq(index).children().click();
        waitOnRequest('https://api.demoblaze.com/deleteitem', 'deleteItem')

    })
})

Then('The user places an order without the credit card', ()=>{

    CartPage.placeOrderButton.click();
    CartPage.placeOrderModalWindow.invoke('attr', "style").should(elem => {
        expect(elem.replace(/\s/g, '')).to.include("display:block")
    })
    let totalValue = 0
    CartPage.placeOrderPopUpTitle.then($text => {
        if ($text.is(':visible')) {
            cy.wait(1000)
            CartPage.productsTablePrice.each(($elem, index, $list) => {
                totalValue += parseInt($elem.text())
                if (index == $list.length - 1) {
                    CartPage.placeOrderPopUpTotal.should('have.text', "Total: " + totalValue.toString())
                }
            })
            CartPage.placeOrderName.clear().type(Cypress.env('username'));
            CartPage.placeOrderCountry.clear().type("Test_Country");
            CartPage.placeOrderPurchaseButton.click();
            cy.on('window:alert', text => {
                expect(text).to.eql("Please fill out Name and Creditcard.");
            });
            
        }
    })

})

Then('The user places an order completing all the fields', ()=>{

    CartPage.placeOrderButton.click();
    CartPage.placeOrderModalWindow.invoke('attr', "style").should(elem => {
        expect(elem.replace(/\s/g, '')).to.include("display:block")
    })
    cy.wait(500)
    let totalValue = 0
    CartPage.placeOrderPopUpTitle.then($text => {
        if ($text.is(':visible')) {
            cy.wait(1000)
            CartPage.productsTablePrice.each(($elem, index, $list) => {
                totalValue += parseInt($elem.text())
                if (index == $list.length - 1) {
                    CartPage.placeOrderPopUpTotal.should('have.text', "Total: " + totalValue.toString())
                }
            })
            CartPage.placeOrderName.clear().type(Cypress.env('username'));
            CartPage.placeOrderCountry.clear().type("Test_Country");
            CartPage.placeOrderCreditCard.clear().type("Test Card");
            CartPage.placeOrderPurchaseButton.click();
        }
    })
})

Then('The user verifies the order was placed successfully', ()=> {
    
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth();
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;

    CartPage.purchasedOrderPopUp.invoke('attr', "style").should(elem => {
        expect(elem.replace(/\s/g, '')).to.include("display:block")
    })
    CartPage.purchasedOrderPopUp.then(($insideText) => {
        let value = $insideText.text()
        expect(value).to.contain(Cypress.env('username'))
        expect(value).to.contain(formattedToday)
    })

})

