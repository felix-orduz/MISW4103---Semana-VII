import {    
    CONTENT, 
    PagesPage, 
} from "../../page/version_rc/pagesPage";

describe('Test feature pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        PagesPage.doLogIn();
    });

    it("Escenario 013: Edit Page", () => {
        //Given usuario logueado con paginas creadas
        PagesPage.goToPages();
        cy.screenshot('E013 - Before Edit Page');

        //When Editar página
        cy.get(CONTENT.editPageButton).first().click(); //Click on Edit first page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        cy.intercept("PUT", "/ghost/api/admin/pages/", {}).as("createPage");

        //Then pone contenido
        PagesPage.addContentToPage('Edited Page', 'Edited with cypress. by nf.ortiz 😊')
        cy.wait(1000)

        //Then update page
        cy.get(CONTENT.updatePageButton).first().click(); // click en update

        cy.wait(500)
        cy.screenshot('E013 - Edited Content');

        cy.get('aside.gh-notifications').screenshot("edit notification");

        cy.wait(500)

        //Then se devuelve a la lista de páginas
        PagesPage.goToPages();
        cy.screenshot('E013 - After Edit Page');
 
    });
});