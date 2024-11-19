import { faker } from "@faker-js/faker";
import { 
    PagesPage, 
    CONTENT,  
} from "../../pages/version_rc/pagesPage";

const PAGE_TITLE = "A New Page by Cypress";

describe('Test feature pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        PagesPage.doLogIn();
    });

    afterEach(() => {
        PagesPage.deletePageByTitle(PAGE_TITLE);
    });

    it("Escenario 021: Crear Page con contenido html generedo online", () => {
        //Given usuario logueado
        PagesPage.goToPages();
        cy.screenshot('../../ghost-5.96/E00021-0-RC');

        //Then Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //Then pone contenido
        let content = "<p>" + faker.lorem.paragraph() + "</p>";
        PagesPage.addContentToPage(PAGE_TITLE, content);

        cy.wait(500)
        cy.screenshot('../../ghost-5.96/E00021-1-RC');

        //And publica la página
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar

        cy.wait(500)

        //And confirma la creacion de la Page
        PagesPage.clickConfirmCreatePage();

        cy.wait(500);
        cy.screenshot('../../ghost-5.96/E00021-2-RC');

        // Then verifica que existe una Page creada
        PagesPage.getPublishPageModal().within(() => {
            cy.get('h2').should('contain', PAGE_TITLE);
        });

    });
});
