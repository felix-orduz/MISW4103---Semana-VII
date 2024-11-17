import { 
    PagesPage, 
    CONTENT,  
} from "../../pages/version_base/pagesPage";

let PAGE_TITLE = "A New Page by Cypress";


describe('Test feature pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        PagesPage.doLogIn();
    });

    afterEach(() => {
        PagesPage.deletePageByTitle('(Untitled)');
    });

    it("Escenario 012: Create empty page", () => {
        //Given usuario logueado
        PagesPage.goToPages();
        cy.screenshot('../../ghost-4.5/E012 - Antes de crear la empty Page');

        //Then Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location


        //Then pone contenido
        let content = " To live is to risk it all.";
        let title = "A New Page by Cypress";
        PagesPage.addContentToPage(title, content);

        cy.wait(500)

        //Then pone titulo y contenido vacio
        cy.get(CONTENT.pageTitleInput).clear();
        cy.get(CONTENT.pageContentInput).first().clear();    

        cy.wait(500)
        cy.screenshot('../../ghost-4.5/E012 - Pagina vacia');

        //Then publica la página
        cy.get(CONTENT.publishPageButtonDropd).first().click(); // click en publicar
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar
        cy.wait(500)

        cy.screenshot('../../ghost-4.5/E012 - Creada Pagina vacia');
    });
});