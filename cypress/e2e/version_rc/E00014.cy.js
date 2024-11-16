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
        cy.screenshot('../../ghost-5.96/E014 - Before Unpublish');

        //When editar página
        cy.get(CONTENT.editPageButton).first().click(); //Click on Edit first page
        cy.location("hash").should("contains", "#/editor/page"); // check location


        cy.wait(500)

        //Then unpublish la página
        cy.get(CONTENT.unpublishPageButton).contains('Unpublish').first().click(); // click en unpublish

        cy.wait(500)

        //Then nueva pagina del modal
        cy.get(CONTENT.newPageModal).within(() => {
            cy.get('button[data-test-button="revert-to-draft"]').first().click() // click en continuar
        })
        
        cy.wait(500)
        cy.get('div[data-test-editor-post-status=""]').contains('Draft');
        cy.screenshot('../../ghost-5.96/E014 - Set to draft state');
    });
   
});