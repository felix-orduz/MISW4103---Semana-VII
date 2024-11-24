import { faker } from "@faker-js/faker";
import pseudo from '../utils/pseudo';

import {    
    CONTENT, 
    PagesPage, 
} from "../pages/pagesPage";

const PAGE_TITLE = 'Edited Page'

describe('Feature: El usuario admin puede Editar Pages', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        PagesPage.doLogIn();
        PagesPage.createPage("Page to be Edited", "Random content");
    });

    it("E00098: Editar Page con datos a-priori generados con Mockaroo", () => {
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

    it("E00099: Editar Page con datos generados aleatorimente con FakeJS", () => {
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

    it("E000100: Edita Page con datos online generados pseudo aleatorios.", () => {
        pseudo.getDataFromMockaroo();

       //Given usuario logueado con paginas creadas
       PagesPage.goToPages();

       //When Edita página
       cy.get('@data').then(response => {
        let title = response.body[0].page_title;
        let content = response.body[0].page_content;
       
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
});