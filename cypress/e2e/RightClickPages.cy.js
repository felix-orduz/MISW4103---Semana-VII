import { faker } from "@faker-js/faker";
import { PagesPage, CONTENT } from "../pages/pagesPage";


describe("Feature: El usuario puede acceder a funcionalidades al hacer click derecho a la Page", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    PagesPage.doLogIn();
  });

  it("Escenario 042: Duplicar una Pagina con contenido aleatorio generado online.", () => {
    let PAGE_TITLE = faker.lorem.sentence(3);

    //Given usuario logueado
    PagesPage.goToPages();

    //Then Crear nueva página
    cy.get(CONTENT.newPageButton).click(); //Click on New Page
    cy.location("hash").should("contain", "#/editor/page"); // check location

    //Then pone contenido
    let content = faker.lorem.paragraph(2);
    PagesPage.addContentToPage(PAGE_TITLE, content);
    cy.wait(500);
    
    //And publica la página
    cy.get(CONTENT.publishPageButton).first().click(); // click en publicar

    cy.wait(500);

    PagesPage.clickConfirmCreatePage();
    cy.wait(500);

    PagesPage.closeModal();

    PagesPage.goToPages();

    PagesPage.getListPages().within(() => {
        // cy.get("h3.gh-content-entry-title")
        cy.contains(PAGE_TITLE)
          .first()
          .rightclick({ force: true });
      });

    cy.wait(100);
    PagesPage.getButtonOnRigthClickMenu('duplicate')
        .first()
        .click({ force: true });
    
    PagesPage.getListPages()
    .contains(PAGE_TITLE + " (Copy)")
    .should("contain", "Draft");
  });

  it("Escenario 043: Agregar Tag una Pagina con contenido aleatorio generado online.", () => {
        let PAGE_TITLE = faker.lorem.sentence(3);

        //Given usuario logueado
        PagesPage.goToPages();

        //Then Crear nueva página
        cy.get(CONTENT.newPageButton).click(); //Click on New Page
        cy.location("hash").should("contain", "#/editor/page"); // check location
    
        //Then pone contenido
        let content = faker.lorem.paragraph(2);
        PagesPage.addContentToPage(PAGE_TITLE, content);
        cy.wait(500);
        
        //And publica la página
        cy.get(CONTENT.publishPageButton).first().click(); // click en publicar
    
        cy.wait(500);
    
        PagesPage.clickConfirmCreatePage();
        cy.wait(500);
    
        PagesPage.closeModal();
    
        PagesPage.goToPages();
    
        PagesPage.getListPages().within(() => {
            // cy.get("h3.gh-content-entry-title")
            cy.contains(PAGE_TITLE)
              .first()
              .rightclick({ force: true });
          });
    
        cy.wait(100);
        PagesPage.getButtonOnRigthClickMenu('add-tag')
            .first()
            .click({ force: true });
        
        let TagName = 'News';
        PagesPage.getModal().within(() => {
            PagesPage.getSearchTagInput()
                .type('News')
                .trigger('keydown', { key: 'Enter' });

            PagesPage.getListOfTagsAvailableForPage().contains(TagName).click();
            PagesPage.buttonAddTagToPage().click();
        });
        
        cy.wait(500);
        PagesPage.getListPages()
            .contains(TagName);
  });

  it("Escenario 044: Agregar Feature a una Pagina con contenido generado online.", () => {
    let PAGE_TITLE = faker.lorem.sentence(3);

    //Given usuario logueado
    PagesPage.goToPages();

    //Then Crear nueva página
    cy.get(CONTENT.newPageButton).click(); //Click on New Page
    cy.location("hash").should("contain", "#/editor/page"); // check location

    //Then pone contenido
    let content = faker.lorem.paragraph(2);
    PagesPage.addContentToPage(PAGE_TITLE, content);
    cy.wait(500);
    
    //And publica la página
    cy.get(CONTENT.publishPageButton).first().click(); // click en publicar

    cy.wait(500);

    PagesPage.clickConfirmCreatePage();
    cy.wait(500);

    PagesPage.closeModal();

    PagesPage.goToPages();

    PagesPage.getListPages().within(() => {
        // cy.get("h3.gh-content-entry-title")
        cy.contains(PAGE_TITLE)
          .first()
          .rightclick({ force: true });
      });

    cy.wait(100);
    PagesPage.getButtonOnRigthClickMenu('feature')
        .first()
        .click({ force: true });
    
    
    cy.wait(500);
    PagesPage.getListPages()
        .contains(PAGE_TITLE)
        .within(() => {
            cy.get('svg')
            .should('have.class', 'gh-featured-post')
        });
  });


});
