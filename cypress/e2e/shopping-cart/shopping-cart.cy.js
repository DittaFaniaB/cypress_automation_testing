require('cypress-xpath');
import shoppingCartPage from '../../support/pageObject/shopping-cart/shopping-cart.page';
const fixture = require('../../fixtures/login.json');

describe('Magento', () => {
  describe('Shopping Cart', () => {
    before(() => {
      cy.visit('');
      cy.get(shoppingCartPage.singInButton).click();
      cy.login(fixture.validEmail,fixture.validPassword);
      cy.get('.logged-in').should('contain', 'Welcome, ');
      cy.wait(1000);
    })
    
    it('[TC0001] User can access cart page by hitting url directly', () => {
      shoppingCartPage.visitCartUrl();
      cy.get('.base').should('contain', 'Shopping Cart');
    })

    it('[TC0002] User can add products to cart', () => {
        cy.get('#ui-id-3').click();
        cy.xpath(`//li[@class="item"]/a[contains(text(), 'Tees')]`).first().click();
        cy.xpath(`(//div[@class="product-item-info"])[1]`).click();
        cy.wait(1000);
        try {
          cy.get('.swatch-opt', { timeout: 10000 }).should('be.visible');
          //choose size
          cy.xpath(`(//div[@role="listbox"])[1]/div[@role="option"][1]`).click();
          //choose color
          cy.xpath(`(//div[@role="listbox"])[2]/div[@role="option"][1]`).click();
        } catch (error) {
          
        }
        // click add to cart
        cy.xpath(`//*[@id="product-addtocart-button"]`).click();
        cy.get('.message-success').should('be.visible');
        cy.wait(1000);
    })

    it('[TC0003] User can access cart page after adding products ', () => {
      cy.get('.showcart').click();
      cy.xpath(`//a[@class="action viewcart"]`).click();
      cy.wait(2000);
      cy.get('.base').should('contain.text', 'Shopping Cart');
      cy.get('.summary').should('be.visible');
      shoppingCartPage.orderTotalTextIsVisible();
    })

    it('[TC0004] User can update product quantity on cart page with valid number', () => {
      cy.wait(2000);
      var ele = cy.xpath(`(//input[@title="Qty"])[1]`);
      ele.clear();
      ele.type('2');
      cy.xpath(`(//td[2]//span[@class="price"])[1]`).then(function ($element) {
        var eleText = $element.text();
        cy.log("teks " + eleText);
        //validate subtotal
        var price = parseInt(eleText.substring(1, 3));
        var subtotal = price * 2;
        cy.get('.update').click();
        cy.xpath(`(//td[4]//span[@class="price"])[1]`).should('contain', subtotal);
        shoppingCartPage.orderTotalTextIsVisible();

      })
    })

    it('[TC0005] User can not update product quantity on cart page with decimal number', () => {
      cy.wait(500);
      shoppingCartPage.orderTotalTextIsVisible();
      cy.wait(1000);
      var ele = cy.xpath(`(//input[@title="Qty"])[1]`);
      ele.clear();
      ele.type('2.5');
      cy.get('.update').click();
      cy.contains('You cannot use decimal quantity for this product.').should('be.visible');
      cy.xpath(`//button/span[contains(text(),'OK')]`).click();
    })

    it('[TC0006] User can not update product quantity on cart page with empty field', () => {
      cy.wait(1000);
      shoppingCartPage.orderTotalTextIsVisible();
      var ele = cy.xpath(`(//input[@title="Qty"])[1]`);
      ele.clear();
      cy.get('.update').click();
      cy.xpath(`//td[3]//div[contains(text(),'This is a required field.')]`).should('be.visible');
    })

    it('[TC0007] User can delete a product on cart page', () => {
      cy.get('.action-delete').first().click();
    })

    after(()=>{
      cy.signOut();
    })
  })
})
  