import {    
    CONTENT, 
    PagesPage
} from "../../pages/version_rc/pagesPage";


const PAGE_TITLE = "Page to be Unpublished"

describe('Test feature pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        PagesPage.doLogIn();
        PagesPage.createPage(PAGE_TITLE, "Random content");
    });

    it("Escenario 014: Unpublish page", () => {
        //Given usuario logueado
        PagesPage.goToPages();        
        cy.screenshot('../../ghost-5.96/E00014-0-RC');

        //When editar página
        PagesPage.getEditFirstPageButton().click(); //Click on Edit first page
        cy.location("hash").should("contain", "#/editor/page"); // check location


        cy.wait(500)

        //And da click en unpublish Página
        PagesPage.getUnPublishPageButton()
            .contains('Unpublish').first().click(); // click en unpublish

        cy.wait(500)

        //And confirma unpublish Pagina del modal
        cy.get(CONTENT.newPageModal).within(() => {
            PagesPage.getRevertToDraftPageButton().click() // click en continuar
        })
        

        cy.wait(500)
        // Then Verifica que el estado sea Draft
        PagesPage.getPageStatus().contains('Draft');

        cy.screenshot('../../ghost-5.96/E00014-1-RC');
    });
   
});