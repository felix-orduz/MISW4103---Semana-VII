import { LogIn } from "../../pages/version_rc/logIn";

import { 
    PagesPage, 
    CONTENT, 
} from "../../utils/pages";
const BASE_URL = "http://localhost:2368";

describe('Test feature pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        PagesPage.doLogIn();
    });

    it("Escenario 011: Create new page", () => {
        //Given usuario logueado
        cy.visit(BASE_URL + '/ghost/#/pages/')

        //Then Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        cy.intercept("PUT", "/ghost/api/admin/pages/*", {}).as("createPage");

        //Then pone contenido
        let content = " To live is to risk it all, otherwise you’re just an inert chunk of randomly assembled molecules drifting wherever the universe blows you.";
        PagesPage.addContentToPage("A New Page by Cypress", content)

        cy.wait(1000)

        //Then publica la página
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar

        cy.wait(500)

        //Then verifica que la página fue creada
        PagesPage.confirmCreatePage();

        cy.wait(500)
        cy.screenshot('New Page')
    });
});