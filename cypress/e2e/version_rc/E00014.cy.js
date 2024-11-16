import {    
    CONTENT, 
    doLogIn
} from "../../page/version_rc/pagesPage";
const BASE_URL = "http://localhost:2368";

describe('Test feature pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        doLogIn();
    });

    it("Escenario 014: Unpublish page", () => {
        //Given usuario logueado
        cy.visit(BASE_URL + '/ghost/#/pages/')
        cy.screenshot('Before Unpublish');

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
        cy.screenshot('Set to draft state');
    });
   
});