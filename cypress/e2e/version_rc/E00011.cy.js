
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

    afterEach(() => {
        PagesPage.deletePageByTitle("");
    })

    it("Escenario 011: Create new page", () => {
        //Given usuario logueado
        PagesPage.goToPages();

        //Then Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //Then pone contenido
        let title = "A New Page by Cypress";
        let content = " To live is to risk it all.";
        PagesPage.addContentToPage(title, content);

        cy.wait(1000)

        //Then publica la página
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar

        cy.wait(500)

        //And confirma creacion de la página 
        PagesPage.clickConfirmCreatePage();

        cy.wait(500)

        // Then verifica que existe una Page creada
        PagesPage.getPublishPageModal.within(() => {
            cy.get('h2').should('contain', title);
            cy.get('p').should('contain', content);
        });

        // Toma Screenshot
        cy.screenshot('New Page')
    });
});