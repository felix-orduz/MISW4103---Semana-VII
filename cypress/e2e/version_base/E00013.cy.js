import {    
    CONTENT, 
    PagesPage, 
} from "../../pages/version_base/pagesPage";

const PAGE_TITLE = "Page to be EDITED"

describe('Test feature pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        PagesPage.doLogIn();
        PagesPage.createPage(PAGE_TITLE, "Random content");
    });

    afterEach(() => {
        PagesPage.deletePageByTitle(PAGE_TITLE);
    });

    it("Escenario 013: Edit Page", () => {
        //Given usuario logueado con paginas creadas
        PagesPage.goToPages();
        cy.screenshot('../../ghost-4.5/E013 - Before Edit Page');

        //When Editar página
        PagesPage.getListOfPages().contains(PAGE_TITLE).click(); //Click on Edit first page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //Then pone contenido
        PagesPage.addContentToPage('Edited Page', 'Edited with cypress. by nf.ortiz 😊')
        cy.wait(1000)

        //Then update page
        PagesPage.doClickOnUpdatePageButton(); // click en update

        cy.wait(500)
        cy.screenshot('../../ghost-4.5/E013 - Edited Content');

        PagesPage.getUpdatePageNotification()
            .screenshot("../../ghost-4.5/E013 - edit page notification");

        cy.wait(500)

        //Then se devuelve a la lista de páginas
        PagesPage.goToPages();
        cy.screenshot('../../ghost-4.5/E013 - After Edit Page');
 
    });
});