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

    it("E000101: Unpublish page creada con contenido aleatorio", () => {
        //Given usuario logueado y una pagina publicada
        PagesPage.goToPages();  
        let title = faker.lorem.sentence();
        let content = faker.lorem.paragraph();
        PagesPage.createPage(title, content);      

        //And doy click en editar página
        PagesPage.goToPages();  
        PagesPage.getEditPageButtonByTitle(title); //Click on Edit first page
        cy.location("hash").should("contain", "#/editor/page"); // check location


        cy.wait(500)

        //When da click en unpublish Página
        PagesPage.getUnPublishPageButton()
            .contains('Unpublish').first().click(); // click en unpublish

        cy.wait(500)

        //And confirma unpublish Pagina del modal
        cy.get(CONTENT.newPageModal).within(() => {
            PagesPage.getRevertToDraftPageButton().click() // click en continuar
        })

        cy.wait(500)
        // Then El estado de la pagina sea Draft
        PagesPage.getPageStatus().contains('Draft');

    });
   
});