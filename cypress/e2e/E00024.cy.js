import { faker } from "@faker-js/faker";
import { PagesPage, CONTENT } from "../../pages/version_rc/pagesPage";

const PAGE_TITLE = faker.lorem.sentence(3);

describe("Feature Pages", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    PagesPage.doLogIn();
  });

  it("Escenario 024: Duplicar una Pagina.", () => {
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

    cy.get("div.posts-list").within(() => {
        // cy.get("h3.gh-content-entry-title")
        cy.contains(PAGE_TITLE)
          .first()
          .rightclick({ force: true });
      });

      cy.wait(100);
      cy.get('button[data-test-button="duplicate"]')
        .first()
        .click({ force: true });
  });

  cy.get("div.posts-list").contains(PAGE_TITLE + " (Copy)")
});
