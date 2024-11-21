
import { faker } from "@faker-js/faker";

import { 
    PagesPage, 
    CONTENT, 
} from "../pages/version_rc/pagesPage";

describe('Feature: El usuario admin puede crear Pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        PagesPage.doLogIn();
    });

    it("Escenario 31: Crear nueva Page con datos a-priori generados con Mockaroo", () => {
        //Given usuario logueado
        PagesPage.goToPages();

        //When Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //Then pone contenido
        let content;
        let title;
        cy.fixture("pages.data.apriori.json").then((data) => {
            content = data[0].content
            title = data[0].title
            PagesPage.addContentToPage(title, content);
            cy.wait(500);

            //Then publica la página
            cy.get(CONTENT.publishPageButton).first().click(); // click en publicar
            cy.wait(500);

            //And confirma creacion de la página 
            PagesPage.clickConfirmCreatePage();
            cy.wait(500);

            // Then verifica que existe una Page creada
            PagesPage.getPublishPageModal().within(() => {
                PagesPage.getPageTitleInConfirmationModal()
                    .should('contain', title);
            });

            cy.wait(500);
            PagesPage.closeModal();
            PagesPage.deletePageByTitle(title);
        });
    });

    it("Escenario 32: [TODO]Crear nueva Page con datos online generados pseudo aleatorios.", () => {
        //Given usuario logueado
        PagesPage.goToPages();

        // TODO
    });

    it("Escenario 33: Crear nueva Page con datos online generados aleatorios.", () => {
        //Given usuario logueado
        PagesPage.goToPages();

        //When Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //Then pone contenido
        let title = faker.lorem.sentence();
        let content = faker.lorem.paragraph();
        PagesPage.addContentToPage(title, content);
        cy.wait(500);

        //Then publica la página
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar

        //And confirma creacion de la página 
        PagesPage.clickConfirmCreatePage();
        cy.wait(500);

        // Then verifica que existe una Page creada
        PagesPage.getPublishPageModal().within(() => {
            PagesPage.getPageTitleInConfirmationModal()
                .should('contain', title);
        });

        cy.wait(500);
        PagesPage.closeModal();

        PagesPage.deletePageByTitle(title);
    });


    it("Escenario 34: Crear Page vacia. [BUG]", () => {
        //Given usuario logueado
        PagesPage.goToPages();

        //Then Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //Then pone contenido
        let content = " To live is to risk it all.";
        let title = "A New Page by Cypress";
        PagesPage.addContentToPage(title, content);

        cy.wait(500)

        //Then pone titulo y contenido vacio
        cy.get(CONTENT.pageTitleInput).clear();
        cy.get(CONTENT.pageContentInput).first().clear();    

        cy.wait(500)
        cy.screenshot('../../ghost-5.96/E00012-1-RC');

        //Then publica la página
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar

        cy.wait(500)

        //And confirma la creacion de la Page
        PagesPage.clickConfirmCreatePage();

        cy.wait(500)
        PagesPage.deletePageByTitle("(Untitled)");
    });

    it("Escenario 35: Crear Page con un titulo mayor a 255 characteres generado on line aleatorio.", () => {
        //Given usuario logueado
        PagesPage.goToPages();
    
        //Then Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location
    
        //Then pone contenido
        let title = faker.string.alpha(255);
        let content = faker.lorem.paragraph();
        PagesPage.addContentToPage(title, content);
        cy.wait(500);
        
        PagesPage.addContentToPage(title + "a", content);
        cy.wait(500);

        //And publica la página
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar
        cy.wait(500);
    
        //Then confirma que no se crea la pagina
        // And se muestra banner de error
        PagesPage.getPageVerificationFailedComponent()
        .should(
            "contain",
            "Validation failed: Title cannot be longer than 255 characters."
        );
    
      });

      it("Escenario 36: Crear Page con contenido html generedo aleatorio online", () => {
        //Given usuario logueado
        PagesPage.goToPages();

        //Then Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //Then pone contenido
        const PAGE_TITLE = "A New Page by Cypress";
        let content = "<p>" + faker.lorem.paragraph() + "</p>";
        PagesPage.addContentToPage(PAGE_TITLE, content);

        cy.wait(500);

        //And publica la página
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar
        cy.wait(500);

        //And confirma la creacion de la Page
        PagesPage.clickConfirmCreatePage();

        // Then verifica que existe una Page creada
        PagesPage.getPublishPageModal().within(() => {
            PagesPage.getPageTitleInConfirmationModal()
                .should('contain', PAGE_TITLE);
        });

        PagesPage.deletePageByTitle(PAGE_TITLE);
    });

    it("Escenario 37: Crear Page con contenido corrupto html generedo aleatorio online", () => {
        //Given usuario logueado
        PagesPage.goToPages();
    
        //When Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location
    
        //Then pone contenido
        const PAGE_TITLE = "A New Page by Cypress";
        let content = "<p>" + faker.lorem.paragraph();
        PagesPage.addContentToPage(PAGE_TITLE, content);
        cy.wait(500);
    
        //And publica la página
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar
        cy.wait(500);
    
        //And confirma la creacion de la Page
        PagesPage.clickConfirmCreatePage();
        cy.wait(500);
    
        // Then verifica que existe una Page creada
        PagesPage.getPublishPageModal().within(() => {
            PagesPage.getPageTitleInConfirmationModal()
                .should("contain", PAGE_TITLE);
        });

        PagesPage.deletePageByTitle(PAGE_TITLE);    
      });
});