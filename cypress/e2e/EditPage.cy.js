import { faker } from "@faker-js/faker";

import {    
    CONTENT, 
    PagesPage, 
} from "../pages/version_rc/pagesPage";

const PAGE_TITLE = 'Edited Page'

describe('Feature: El usuario admin puede Editar Pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        PagesPage.doLogIn();
        PagesPage.createPage("Page to be Edited", "Random content");
    });

    it("Escenario 38: Editar Page con datos a-priori generados con Mockaroo", () => {
        //Given usuario logueado con paginas creadas
        PagesPage.goToPages();

        //When Edita página
        let title;
        cy.fixture("pages.data.apriori.json").then((data) => {
            title = data[1].title
        
            cy.get(CONTENT.editPageButton).first().click(); //Click on Edit first page
            cy.location("hash").should("contain", "#/editor/page"); // check location

            //And pone contenido
            PagesPage.clearPageTitle();
            PagesPage.addContentToPage(title, 'Edited with cypress. by nf.ortiz 😊')
            cy.wait(500)

            //And update page
            cy.get(CONTENT.updatePageButton).first().click(); // click en update
            cy.wait(500)

            PagesPage.getUpdatePageNotification();
            cy.wait(500)

            //Then se confirma que la pagina ha sido editada
            PagesPage.goToPages();
            PagesPage.getListPages().contains(title);


            PagesPage.deletePageByTitle(title);
        });
    });

    it("Escenario 39: Editar Page con datos generados aleatorimente con FakeJS", () => {
        //Given usuario logueado con paginas creadas
        PagesPage.goToPages();

        //When Edita página
        let title = faker.lorem.sentence();
        let content = faker.lorem.paragraph();
        
        cy.get(CONTENT.editPageButton).first().click(); //Click on Edit first page
        cy.location("hash").should("contain", "#/editor/page"); // check location

        //And pone contenido
        PagesPage.clearPageTitle();
        PagesPage.addContentToPage(title, content)
        cy.wait(500)

        //And update page
        cy.get(CONTENT.updatePageButton).first().click(); // click en update
        cy.wait(500)

        PagesPage.getUpdatePageNotification();
        cy.wait(500)

        //Then se confirma que la pagina ha sido editada
        PagesPage.goToPages();
        PagesPage.getListPages().contains(title);


        PagesPage.deletePageByTitle(title);
    });

    it("Escenario 40: [TODO]Edita Page con datos online generados pseudo aleatorios.", () => {
        faker.seed(Date.now())

       //Given usuario logueado con paginas creadas
       PagesPage.goToPages();

       //When Edita página
       let title = faker.lorem.sentence();
       let content = faker.lorem.paragraph();
       
       cy.get(CONTENT.editPageButton).first().click(); //Click on Edit first page
       cy.location("hash").should("contain", "#/editor/page"); // check location

       //And pone contenido
       PagesPage.clearPageTitle();
       PagesPage.addContentToPage(title, content)
       cy.wait(500)

       //And update page
       cy.get(CONTENT.updatePageButton).first().click(); // click en update
       cy.wait(500)

       PagesPage.getUpdatePageNotification();
       cy.wait(500)

       //Then se confirma que la pagina ha sido editada
       PagesPage.goToPages();
       PagesPage.getListPages().contains(title);


       PagesPage.deletePageByTitle(title);
    });
});