class ShoppingCartPage{
    singInButton = '.panel > .header > .authorization-link > a';
    inputFieldDiscountCode = '//input[@name="coupon_code"]';
    btnApplyDiscount = '//button[@value="Apply Discount"]';

    randomText(length) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
          counter += 1;
        }
        return result;
    }

    addProductToCart(product=1) {
      //click Add to Cart - redirected to detail page
      for (let i = 1; i <= product ; i++) {
        cy.get(`//a[@id='ui-id-3']`).click();
        cy.xpath(`(//div[@class="product-item-inner"])[${i}]//button/span[contains(text(),'Add to Cart')]`).click({ force: true });
        cy.wait(3000);
        //choose size
        cy.xpath(`(//div[@role="listbox"])[1]/div[@role="option"][1]`).click();
        //choose color
        cy.xpath(`(//div[@role="listbox"])[2]/div[@role="option"][1]`).click();
        // click add to cart
        cy.xpath(`//*[@id="product-addtocart-button"]`).click();
        cy.get('.message-success').should('be.visible');
      }
    }

    orderTotalTextIsVisible(){
      cy.xpath(`//strong[contains(text(), 'Order Total')]`, { timeout: 20000 }).should('be.visible');
    }

    inputDiscountCode(discountCode = ''){
      cy.get('#block-discount-heading').click();
      cy.wait(1500);
      var inputCode = cy.xpath(this.inputFieldDiscountCode);
      var btnCode = cy.xpath(this.btnApplyDiscount);
      inputCode.should('be.visible');
      btnCode.should('be.visible');
      inputCode.click();
      if (discountCode != '') {
        inputCode.type(discountCode);
      }
      btnCode.click();
    }

    visitCartUrl(){
      cy.visit('https://magento.softwaretestingboard.com/checkout/cart/');
      cy.wait(2000);
      cy.get('.base').should('contain.text', 'Shopping Cart');
    }
}

export default new ShoppingCartPage();