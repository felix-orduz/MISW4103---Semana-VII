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
    cy.fixture('properties.json').then((data) => {
        //Given que estoy en la pagina del login del Admin
        cy.visit(data.baseURL);

        //When inicio sesión con mis credenciales
        LogIn.logIn(data.email, data.password);
        LogIn.logInButton();
        cy.screenshot('../../ghost-4.5/E0007-0-BS');
        cy.wait(1000);
    });
  });

  it("E0007 - Editar un tag con su descripción", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot('../../ghost-4.5/E0007-1-BS');

    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot('../../ghost-4.5/E0007-2-BS');
    //And escriba el nombre del tag
    let name = "TAG E0007";
    TagPage.writeNameTag(name);
    cy.screenshot('../../ghost-4.5/E0007-3-BS');
    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = "TAG DESCRIPCIÓN E0007";
    TagPage.writeDescriptionTag(description);
    cy.screenshot('../../ghost-4.5/E0007-4-BS');
    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot('../../ghost-4.5/E0007-5-BS');
    //And le de click en la sección de Tags
    PrincipalPage.clickTags();

    //And Valida Tag publicado en la lista de tags
    TagPage.lastTagCreated(name, "click");
    cy.wait(1000);
    cy.screenshot('../../ghost-4.5/E0007-6-BS');
    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos la nueva descripción del tag
    let newDescription = "NEW TAG DESCRIPCIÓN E0007";
    TagPage.writeDescriptionTag(newDescription);
    cy.screenshot('../../ghost-4.5/E0007-7-BS');
    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot('../../ghost-4.5/E0007-8-BS');
    //When le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot('../../ghost-4.5/E0007-9-BS');
    //Then Valida Tag publicado en la lista de tags
    TagPage.busqueda(name, "notClick");
  });
});
