class HomePage{

    get modalPopUpWindows(){
        return cy.get('div#logInModal');  // can be used for all modal windows
    }
    get loginRedirect(){
        return cy.get('#login2');
    }
    get topLogoBM(){
        return cy.get('#nava > img[src="bm.png"]');
    }
    get cartMenu(){
        return cy.get('#cartur');
    }
    get homeMenu(){
        return cy.get('.nav-link[href="index.html"]');
    }
}
export default new HomePage();