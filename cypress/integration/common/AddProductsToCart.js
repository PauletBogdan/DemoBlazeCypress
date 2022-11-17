import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";
import HomePage from "../pages/HomePage"
import ProductsPage from "../pages/ProductsPage";
import IndividualProductPage from "../pages/IndividualProductPage"
import CartPage from "../pages/CartPage";
import {waitOnRequest} from "../common/common"


Given('The user chooses his category to be {string}', async (categoryType) => {

    ProductsPage.categoryType.contains(categoryType).click();
    ProductsPage.allProductsTable.then($table => {
        $table.is(':visible')
    });
    waitOnRequest('https://hls.demoblaze.com/about_demo_hls_600k00000.ts','category')
    cy.wait(1500)

})

Then('The user chooses the product {string}', async(productName) => {

    ProductsPage.productNames.contains(productName).eq(0).click();
    cy.location('pathname', {timeout: 30000}).should('include', 'prod.html');
    IndividualProductPage.productPicture.should('be.visible');
    IndividualProductPage.productName.should('have.text', productName)
    waitOnRequest('https://hls.demoblaze.com/about_demo_hls_600k00000.ts','category')


});
Then('The user adds the product {string} times to his cart', async(productTimes) => {

    for(let i=0; i< productTimes ; i++){

        if(i>=1){
            cy.wait(1000)
        }
        IndividualProductPage.addToCartButton.click();
        cy.on('window:alert', text => {
            expect(text).to.contain("Product added");
        });
        waitOnRequest('https://api.demoblaze.com/addtocart','productToCart')
        IndividualProductPage.productPicture.should('be.visible');
        cy.location('pathname', {timeout: 30000}).should('include', 'prod.html');
    }

});

Then('The user verifies that the product {string} has been added {string} times', (productName, productTimes) => {

    let timesFound = 0
    for(let i =0; i< productTimes; i++){
        cy.wait(500);
    }
    CartPage.productsTableName.each(($element, index, $list) => {
        var text = $element.text()
        if(text.includes(productName)){
        timesFound ++
        }
    })
    CartPage.productsTableName.then($element => {
        expect(timesFound.toString()).to.eq(productTimes)
    })
})

Given('The user adds the {string} product to his cart {string} times', (productName, numberOfTime) => {

    
    ProductsPage.productNames.contains(productName).eq(0).click();
    cy.url().should('contain',"prod.html")

    for(let i=0; i<numberOfTime; i++){
        IndividualProductPage.addToCartButton.click();
        cy.on('window:alert', text => {
            expect(text).to.eql("Product Added.");
        });
        IndividualProductPage.productPicture.should('be.visible');
    }
})

Given('The user adds multiple products to his cart', (dataTable) => {

    //just for example to show multiple products added to the cart in the same step // requires navigation back to the products as well
    dataTable.hashes().forEach(row => {
        ProductsPage.productNames.contains(row.productName).eq(0).click();
        cy.url().should('contain',row.productPage)
        IndividualProductPage.productPicture.should('be.visible');
    });

})