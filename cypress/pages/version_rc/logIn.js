export class LogIn {
    //Metodo para iniciar sesion
    static logIn(email, password) {
        cy.get('#identification').type(email);
        cy.get('#password').type(password);
    }

    //Metodo para dar click en el boton de iniciar sesion
    static logInButton() {
        return cy.get('#ember5').click({force: true});
    }
}