class loginPage {
    email = '#email'
    emailForgot = '#email_address'
    pass = '#pass'
    loginBtn = '#send2'
    errorMsg = '.message-error'
    forgotPass = '.login-container > .block-customer-login > .block-content > #login-form > .fieldset > .actions-toolbar > .secondary > .action > span'
    notif = '.base'
    resetPass = '#form-validate > .actions-toolbar > div.primary > .action'
    successChange ='.message-success > div'
    emailError = '#email-error'
    profile = '.logged-in'

    clickLoginBtn(){
        cy.get(this.loginBtn).click()
    }
    verifyErrorMsg(message){
        cy.get(this.errorMsg).should('contain.text', message)
    }
    customerLogin(message) {
        cy.get(this.notif).should('contain.text', message)
    }
}

export default new loginPage()
    