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

  it("Escenario 024: Agregar Tag una Pagina con contenido aleatorio generado online.", () => {
    //Given usuario logueado
    // And a Page created
    let title = faker.lorem.sentence(4);
    let content = faker.lorem.paragraph(2);
    PagesPage.createPage(title, content);
    cy.wait(500);

    PagesPage.goToPages(); 
    cy.location("hash").should("contain", "/#/pages"); // check location
    
    //Then Agrego tag a la pagina

    PagesPage.getListPages().within(() => {
        PagesPage.doRightClickPageItem(PAGE_TITLE);
    });

      cy.wait(100);
      cy.get('button[data-test-button="duplicate"]')
        .first()
        .click({ force: true });
  });

  PagesPage.getListPages().contains(PAGE_TITLE + " (Copy)")
});
