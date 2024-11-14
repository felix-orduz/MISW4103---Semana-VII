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
    cy.visit("http://localhost:2368/ghost/#/signin");

    //When inicio sesión con mis credenciales
    LogIn.logIn(data.email, data.password);
    LogIn.logInButton();
  });

  it("E0009 - Crear un tag duplicado nombre y la descripción.", function () {
    //When le de click en la sección de Tags
    PrincipalPage.clickTags();

    //Then el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //When le de click en el boton New Tag
    TagPage.clickNewTag();

    //Then escriba el nombre del tag
    let name = faker.lorem.word();
    TagPage.writeNameTag(name);

    //When le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //Then escribimos descripción del tag
    let description = faker.lorem.words();
    TagPage.writeDescriptionTag(description);

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);

    //When le de click en la sección de Tags
    PrincipalPage.clickTags();

    //Then Valida Tag publicado en la lista de tags
    TagPage.busqueda(name, "notClick");
    cy.wait(1000);

    //When le de click en el boton New Tag
    TagPage.clickNewTag();

    //Then escribimos la el nombre del tag anterior
    TagPage.writeNameTag(name);

    //When le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //Then escribimos la descripción del tag anterior
    TagPage.writeDescriptionTag(description);

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);

    //When le de click en la sección de Tags
    PrincipalPage.clickTags();

    //Then Valida Tag publicado en la lista de tags
    TagPage.busqueda(name, "notClick");
  });
});
