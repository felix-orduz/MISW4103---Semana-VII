import {    
    CONTENT, 
    PagesPage, 
} from "../../pages/version_rc/pagesPage";

const PAGE_TITLE = 'Edited Page'

describe('Test feature pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        PagesPage.doLogIn();
        PagesPage.createPage("Page to be Edited", "Random content");
    });

    afterEach(() => {
        PagesPage.deletePageByTitle(PAGE_TITLE);
    });

    it("Escenario 013: Edit Page", () => {
        //Given usuario logueado con paginas creadas
        PagesPage.goToPages();
        cy.screenshot('../../ghost-5.96/E00013-0-RC');

        //When Edita página
        cy.get(CONTENT.editPageButton).first().click(); //Click on Edit first page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //And pone contenido
        PagesPage.clearPageTitle();
        PagesPage.addContentToPage(PAGE_TITLE, 'Edited with cypress. by nf.ortiz 😊')
        cy.wait(500)

        //And update page
        cy.get(CONTENT.updatePageButton).first().click(); // click en update

        cy.wait(500)
        cy.screenshot('../../ghost-5.96/E00013-1-RC');

        PagesPage.getUpdatePageNotification().screenshot("../../ghost-5.96/E013 - edit page notification");
        cy.wait(500)

        //Then se confirma que la pagina ha sido editada
        PagesPage.goToPages();
        PagesPage.getListOfPages().contains(PAGE_TITLE);

        cy.screenshot('../../ghost-5.96/E00013-2-RC');
 
    });
});