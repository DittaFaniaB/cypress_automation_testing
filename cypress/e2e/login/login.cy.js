import loginPage from "../../support/pageObject/login/login.page";
const userLogin = require('../../fixtures/login.json');

describe('Magento', () => {
  describe('Login', () => {
    beforeEach(() => {
      cy.visit('');      
      cy.get('.panel > .header > .authorization-link > a').click();
    })

    it('[TC0012] User can not login with invalid email and password', () => {
      cy.login(userLogin.invalidEmail,userLogin.invalidPassword) 
      cy.verifyText('.message-error', 'The account sign-in was incorrect')
    })

    it('[TC0013] User can not login with empty field ', () => {
      loginPage.clickLoginBtn();
      cy.get('#email-error').should('contain.text', 'This is a required field.');
      cy.get('#pass-error').should('contain.text', 'This is a required field.');    
    })

    it('[TC0014] User can not login with invalid email format', () => {
      cy.login(userLogin.validPassword,userLogin.validPassword);
      cy.get('#email-error').should('contain.text', 'Please enter a valid email address (Ex: johndoe@domain.com).');
    })
    
    it('[TC0015] User can login with valid credentials', () => {
      cy.get(loginPage.email).type(userLogin.validEmail)
      cy.get(loginPage.pass).type(userLogin.validPassword) 
      cy.get('#send2').click(); 
      cy.get(':nth-child(2) > .greet > .logged-in').should('contain.text', userLogin.message.validEmail)
      cy.get('.logged-in').should('contain', 'Welcome, ');
    })
  })
})
  