import { LogIn } from "../../pages/version_base/logIn";
import { TagPage } from "../../pages/version_base/tagPage";
import { PrincipalPage } from "../../pages/version_base/principalPage";
import { faker } from "@faker-js/faker";
const data = require('../../fixtures/properties.json');

Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false;
  }
});

describe("Escenarios E2E para Ghost", function () {
  beforeEach(() => {
    //Given que estoy en la pagina del login del Admin
    cy.visit(data.baseURL);

    //When inicio sesión con mis credenciales
    LogIn.logIn(data.email, data.password);
    LogIn.logInButton();
    cy.screenshot('../../ghost-4.5/E0009-0-BS');
    cy.wait(1000);
  });

  it("E0009 - Crear un tag duplicado nombre y la descripción.", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot('../../ghost-4.5/E0009-1-BS');
    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot('../../ghost-4.5/E0009-2-BS');
    //And escriba el nombre del tag
    let name = "TAG E0009";
    TagPage.writeNameTag(name);
    cy.screenshot('../../ghost-4.5/E0009-3-BS');
    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = "TAG DESCRIPCIÓN E0009";
    TagPage.writeDescriptionTag(description);
    cy.screenshot('../../ghost-4.5/E0009-4-BS');
    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot('../../ghost-4.5/E0009-5-BS');
    //When le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot('../../ghost-4.5/E0009-6-BS');
    //And Valida Tag publicado en la lista de tags
    TagPage.busqueda(name, "notClick");
    cy.wait(1000);
    cy.screenshot('../../ghost-4.5/E0009-7-BS');
    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot('../../ghost-4.5/E0009-8-BS');
    //And escribimos la el nombre del tag anterior
    TagPage.writeNameTag(name);
    cy.screenshot('../../ghost-4.5/E0009-9-BS');
    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos la descripción del tag anterior
    TagPage.writeDescriptionTag(description);
    cy.screenshot('../../ghost-4.5/E0009-10-BS');
    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot('../../ghost-4.5/E0009-11-BS');
    //When le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot('../../ghost-4.5/E0009-12-BS');
    //Then Valida Tag publicado en la lista de tags
    TagPage.busqueda(name, "notClick");
  });
});
