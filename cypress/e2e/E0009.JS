import { LogIn } from "../../pages/version_rc/logIn";
import { TagPage } from "../../pages/version_rc/tagPage";
import { PrincipalPage } from "../../pages/version_rc/principalPage";
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
    cy.screenshot('../../ghost-5.96/E0009-0-RC');
    cy.wait(1000);
    cy.viewport(1536, 960);
  });

  it("E0009 - Crear un tag duplicado nombre y la descripción.", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot('../../ghost-5.96/E0009-1-RC');
    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot('../../ghost-5.96/E0009-2-RC');
    //And escriba el nombre del tag
    let name = "TAG E0009";
    TagPage.writeNameTag(name);
    cy.screenshot('../../ghost-5.96/E0009-3-RC');
    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = "TAG DESCRIPCIÓN E0009";
    TagPage.writeDescriptionTag(description);
    cy.screenshot('../../ghost-5.96/E0009-4-RC');
    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot('../../ghost-5.96/E0009-5-RC');
    //And le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot('../../ghost-5.96/E0009-6-RC');
    //And Valida Tag publicado en la lista de tags
    TagPage.busqueda(name, "notClick");
    cy.wait(1000);
    cy.screenshot('../../ghost-5.96/E0009-7-RC');
    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot('../../ghost-5.96/E0009-8-RC');
    //And escribimos la el nombre del tag anterior
    TagPage.writeNameTag(name);
    cy.screenshot('../../ghost-5.96/E0009-9-RC');
    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos la descripción del tag anterior
    TagPage.writeDescriptionTag(description);
    cy.screenshot('../../ghost-5.96/E0009-10-RC');
    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot('../../ghost-5.96/E0009-11-RC');
    //When le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot('../../ghost-5.96/E0009-12-RC');
    //Then Valida Tag publicado en la lista de tags
    TagPage.busqueda(name, "notClick");
  });
});
