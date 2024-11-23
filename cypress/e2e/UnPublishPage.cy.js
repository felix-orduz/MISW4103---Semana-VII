import { faker } from "@faker-js/faker";

import {    
    CONTENT, 
    PagesPage
} from "../pages/pagesPage";


const PAGE_TITLE = "Page to be Unpublished"

describe('Feature: Unpublish Page', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        PagesPage.doLogIn();
    });

    it("Escenario 41: Unpublish page creada con contenido aleatorio", () => {
        //Given usuario logueado
        PagesPage.goToPages();  
        let title = faker.lorem.sentence();
        let content = faker.lorem.paragraph();
        PagesPage.createPage(title, content);      

        //When editar página
        PagesPage.goToPages();  
        PagesPage.getEditPageButtonByTitle(title); //Click on Edit first page
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

    });
   
});