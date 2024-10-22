// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
Cypress.Commands.add('login', (email, password) => { 
    cy.get('#email').type(email);
    cy.get('#pass').type(password);
    cy.get('#send2').click();
})
Cypress.Commands.add('signOut', () => { 
    cy.reload();
    cy.get('.logged-in').should('contain', 'Welcome, ');
    cy.xpath('(//button[@class="action switch"])').first().click();
    cy.get('.authorization-link > a').first().click();
})
Cypress.Commands.add('verifyText', (locator, value) => { 
    cy.get(locator).should('contain.text', value)   
})
Cypress.Commands.add('inputText', (locator, value = '') => {
    cy.get(locator).then(($el) => {
        if ($el.attr('id') === 'password' || $el.attr('id') === 'password-confirmation') {
            cy.wrap($el).clear();
        } else {
            cy.wrap($el).clear().type(value);
        }
    });
});
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })