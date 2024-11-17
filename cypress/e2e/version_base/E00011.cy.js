
import { 
    PagesPage, 
    CONTENT, 
} from "../../pages/version_base/pagesPage";
const PAGE_TITLE = "A New Page by Cypress";


describe('Test feature pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        PagesPage.doLogIn();
    });

    afterEach(() => {
        PagesPage.deletePageByTitle(PAGE_TITLE);
    });

    it("Escenario 011: Create new page", () => {
        //Given usuario logueado
        PagesPage.goToPages();
        cy.screenshot('../../ghost-4.5/E011 - Antes de crear la Page');

        // When there are not pages
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //Then Crear nueva página
        let content = "To live is to risk it all.";
        PagesPage.addContentToPage(PAGE_TITLE, content);

        cy.wait(500)

        //And confirma publica la página
        cy.get(CONTENT.publishPageButtonDropd).first().click(); // click en publicar
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar

        cy.wait(500)
        cy.screenshot('../../ghost-4.5/E011 - Creando la Page');

        // Then verifica que existe una Page creada
        PagesPage.goToPages();
        PagesPage.getListOfPages().contains(PAGE_TITLE);

        // Toma Screenshot
        cy.screenshot('../../ghost-4.5/E011 - Page Creada')
    });
});