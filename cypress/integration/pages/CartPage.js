class CartPage{
    
    get productTableSelector(){
        return cy.get('#tbodyid')
    }
    get productsTableName(){
        return cy.get('#tbodyid > tr td:nth-child(2)')
    }
    get productsTablePrice(){
        return cy.get('#tbodyid > tr td:nth-child(3)')
    }
    get productTableDeleteButton(){
        return cy.get('#tbodyid > tr td:nth-child(4)')
    }
    get totalAmount(){
        return cy.get('#totalp');
    }
    get placeOrderButton(){
        return cy.get('button[data-target="#orderModal"]')  //using xpath would be safer //button[contains(text(),"Place Order")] but I don't have it installed it this project
    }
    get placeOrderPopUpTitle(){
        return cy.get('.modal-title[id="orderModalLabel"]');
    }
    get placeOrderPopUpTotal(){
        return cy.get('#totalm')
    }
    get placeOrderName(){
        return cy.get('input#name')
    }
    get placeOrderCountry(){
        return cy.get('input#country')
    }
    get placeOrderCity(){
        return cy.get('input#city')
    }
    get placeOrderCreditCard(){
        return cy.get('input#card')
    }
    get placeOrderMonth(){
        return cy.get('input#month')
    }
    get placeOrderYear(){
        return cy.get('input#year')
    }
    get placeOrderPurchaseButton(){
        return cy.get('button[onclick^="purchaseOrder"]')
    }
    get placeOrderCloseButton(){
        return cy.get('#orderModal > div > div > div.modal-footer > button[data-dismiss="modal"]')
    }
    get placeOrderModalWindow(){
        return cy.get('div#orderModal')
    }
    get purchasedOrderPopUp(){
        return cy.get('div.sweet-alert .sa-success')
    }
    get purchasedOrderDetails(){
        //not sure how it's possible to identify every single text from the pop-up from the p with css selectors but with xpath we could do //p/text()[<lineNumber>]
        return cy.get('p.lead')
    }
}

export default new CartPage()