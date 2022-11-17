class Products{

    get allProductsTable(){
        return cy.get('#tbodyid');
    }
    get categoryType(){
        return cy.get('.list-group [onclick]');
    }
    get productNames(){
        return cy.get('.card-title');
    } 
     
}

export default new Products()