import {   
    PagesPage, 
    CONTENT
} from "../../utils/pages";

describe('Test feature pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        PagesPage.doLogIn();
    });

   
    it("Escenario: Delete page", () => {
        //Given usuario logueado
        PagesPage.goToPages();
        cy.screenshot('Before Delete');

        //When editar página
        cy.get(CONTENT.editPageButton).first().click(); //Click on Edit first page
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
        cy.screenshot('DELETE PAGE')
    });
});