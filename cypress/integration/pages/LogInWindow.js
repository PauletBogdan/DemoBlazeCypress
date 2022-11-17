class LoginWindow{

    get loginTextHeader(){
        return cy.get('div#logInModal > div > div > div.modal-header > #logInModalLabel'); 
    }
    get usernameField(){
        return cy.get('#loginusername');
    }
    get passwordField(){
        return cy.get('#loginpassword');
    }
    get logInButton(){
        return cy.get('button[onclick="logIn()"]');
    }
    get closeButton(){
        return cy.get('#logInModal > div > div > div.modal-footer > button[data-dismiss="modal"]');
    }
    
}
export default new LoginWindow();