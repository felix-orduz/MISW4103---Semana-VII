import { faker } from "@faker-js/faker";
import { PagesPage, CONTENT } from "../pages/pagesPage";

const PAGE_TITLE = faker.string.alpha(255);

describe("Feature Pages", () => {
  Cypress.on("uncaught:exception", (err, runnable) => {
    return false;
  });

  beforeEach(() => {
    PagesPage.doLogIn();
  });

  it("Escenario 023: Crear Page con un titulo mayor a 255 characteres generado on line aleatorio.", () => {
    //Given usuario logueado
    PagesPage.goToPages();

    //Then Crear nueva página
    cy.get(CONTENT.newPageButton).click(); //Click on New Page
    cy.location("hash").should("contain", "#/editor/page"); // check location

    //Then pone contenido
    let content = faker.lorem.paragraph();
    PagesPage.addContentToPage(PAGE_TITLE, content);
    cy.wait(500);
    
    PagesPage.addContentToPage(PAGE_TITLE + "a", content);
    cy.wait(500);
    //And publica la página
    cy.get(CONTENT.publishPageButton).first().click(); // click en publicar

    cy.wait(500);

    //Then confirma que no se crea la pagina
    // And se muestra banner de error
    PagesPage.getPageVerificationFailedComponent().contains(
      "Validation failed: Title cannot be longer than 255 characters."
    );

    cy.wait(500);
  });
});
