export class LogIn {
    //Metodo para iniciar sesion
    static logIn(email, password) {
        cy.get('.email.ember-text-field.gh-input.ember-view').type(email);
        cy.get('.password.ember-text-field.gh-input.ember-view').type(password);
    }

    //Metodo para dar click en el boton de iniciar sesion
    static logInButton() {
        return cy.get('.login.gh-btn.gh-btn-login.gh-btn-block.gh-btn-icon.js-login-button.ember-view').click({force: true});
    }
}