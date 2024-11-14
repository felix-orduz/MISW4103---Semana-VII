import {    
    CONTENT, 
    doLogIn,
    addContentToPage
} from "../../utils/pages";
const BASE_URL = "http://localhost:2368";

describe('Test feature pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        doLogIn();
    });

    it("Escenario 013: Edit page", () => {
        //Given usuario logueado
        cy.visit(BASE_URL + '/ghost/#/pages/')
        cy.screenshot('Before Edit');

        //When Editar página
        cy.get(CONTENT.editPageButton).first().click(); //Click on Edit first page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        cy.intercept("PUT", "/ghost/api/admin/pages/", {}).as("createPage");

        //Then pone contenido
        addContentToPage('Edited Page', 'Edited with cypress. by nf.ortiz 😊')
        cy.wait(1000)

        //Then update page
        cy.get(CONTENT.updatePageButton).first().click(); // click en update

        cy.wait(500)
        cy.get('aside.gh-notifications').screenshot("edit notification");

        cy.wait(500)

        //Then se devuelve a la lista de páginas
        cy.get(CONTENT.goToPagesButton).first().click();    
    });
});