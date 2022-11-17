import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import LogInWindow from "../pages/LogInWindow";
import HomePage from "../pages/HomePage"
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";

Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test on unhandled application exceptions
    return false;
})

Given('The user navigates to the {string} web site', (websiteName) => {

    cy.visit("https://" + websiteName + ".com")
    cy.url().should('include', websiteName); //depending on the website this can be removed
})

Then('The user verifies the title of the page is {string}', (title) => {
    cy.title().should("include", title);
})

Then('The user verifies he landed on the home page', () => {

    HomePage.topLogoBM.should('be.visible');
})


When('The user navigates to the home page', () => {

    HomePage.homeMenu.click();
    cy.location('pathname', { timeout: 30000 }).should('include', '/index');
    HomePage.topLogoBM.should('be.visible');
    cy.wait(1500);
})

Given('The user navigates to his cart', async () => {

    HomePage.cartMenu.click();
    cy.location('pathname', {timeout: 30000}).should('include', '/cart');
    CartPage.productTableSelector.should('exist')
    
    waitOnRequest('https://api.demoblaze.com/viewcart','cartView')
    cy.wait(2500);
 
 });


Given('The user logs in to the DemoBlaze website', () => {

    HomePage.loginRedirect.click();
    HomePage.modalPopUpWindows.invoke('attr', "style").should(elem => {
        expect(elem.replace(/\s/g, '')).to.include("display:block")
    })
    LogInWindow.loginTextHeader.then($text => {
        if ($text.is(':visible')) {
            cy.wait(1000)
            LogInWindow.usernameField.clear().type(Cypress.env('username'));
            LogInWindow.passwordField.clear().type(Cypress.env('password'));
            LogInWindow.logInButton.click();
        }
    })
    ProductsPage.allProductsTable.then($table => {
        $table.is(':visible')
    });
    waitOnRequest('https://api.demoblaze.com/login','login')
});

export function waitOnRequest(requestURL,requestName){
    cy.intercept(requestURL).as(requestName)
    cy.wait('@' + requestName, {timeout:10000})
}