import { faker } from "@faker-js/faker";

import {   
    PagesPage, 
} from "../../pages/pagesPage";

const PAGE_TITLE = "Page to be deleted"

describe('Feature: Eliminar Page', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        PagesPage.doLogIn();
    });

   
    it("E000102: Delete Page con data generada aleatoria", () => {
        //Given usuario logueado y pagina
        let title = faker.lorem.sentence();
        let content = faker.lorem.paragraph();
        PagesPage.createPage(title, content);

        PagesPage.goToPages();

        //When editar página
        PagesPage.getEditFirstPageButton().click(); //Click on Edit first page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //Then borra la página
        PagesPage.getLateralMenuInPage().click(); // click en menu lateral
        PagesPage.getDeletePageButton().click(); // click on delete button

        cy.wait(500)

        //And confirma el borrado
        PagesPage.getConfirmDeleteModal().within(() => {
            PagesPage.clickOnDeletePage(); // click en delete
        })

        cy.wait(500)
        // Then confimar que no exista una pagina.
        
    });
});