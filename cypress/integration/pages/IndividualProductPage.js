class IndividualProductPage{

    get productName(){
        return cy.get('#tbodyid > .name');
    }
    get addToCartButton(){
        return cy.get('.product-content .btn.btn-success[onclick^="addToCart"]')
    }
    get productPicture(){
        return cy.get('.product-content img');
    }

}

export default new IndividualProductPage()