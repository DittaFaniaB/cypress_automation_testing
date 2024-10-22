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
      cy.verifyText(loginPage.errorMsg, 'The account sign-in was incorrect')
    })

    it('[TC0013] User can not login with empty field ', () => {
      loginPage.clickLoginBtn();
      // cy.get('#email-error').should('contain.text', 'This is a required field.');
      // cy.get('#pass-error').should('contain.text', 'This is a required field.');    
      cy.get(loginPage.errorMsg).should('contain', 'A login and a password are required.');
    })

    it('[TC0014] User can not login with invalid email format', () => {
      cy.login(userLogin.validPassword,userLogin.validPassword);
      cy.get(loginPage.emailError).should('contain.text', 'Please enter a valid email address (Ex: johndoe@domain.com).');
    })

    it('[TC0015] User can login with valid credentials', () => {
      cy.get(loginPage.email).type(userLogin.validEmail)
      cy.get(loginPage.pass).type(userLogin.validPassword) 
      cy.get(loginPage.loginBtn).click(); 
      cy.get(loginPage.profile).should('contain.text', userLogin.message.validEmail)
    })
  })
})
  