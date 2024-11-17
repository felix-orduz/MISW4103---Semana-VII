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
    cy.fixture('properties.json').then((data) => {
        //Given que estoy en la pagina del login del Admin
        cy.visit(data.baseURL);

        //When inicio sesión con mis credenciales
        LogIn.logIn(data.email, data.password);
        LogIn.logInButton();
        cy.screenshot('../../ghost-5.96/E0008-0-RC');
        cy.wait(1000);
    });
  });

  it("E0008 - Editar un tag con titulo y descripción", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot('../../ghost-5.96/E0008-1-RC');
    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot('../../ghost-5.96/E0008-2-RC');
    //And escriba el nombre del tag
    let name = "TAG E0008";
    TagPage.writeNameTag(name);
    cy.screenshot('../../ghost-5.96/E0008-3-RC');
    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = "TAG DESCRIPCIÓN E0008";
    TagPage.writeDescriptionTag(description);
    cy.screenshot('../../ghost-5.96/E0008-4-RC');
    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot('../../ghost-5.96/E0008-5-RC');
    //And le de click en la sección de Tags
    PrincipalPage.clickTags();

    //And Valida Tag publicado en la lista de tags
    TagPage.lastTagCreated(name, "click");
    cy.wait(1000);
    cy.screenshot('../../ghost-5.96/E0008-6-RC');
    //And escriba el nuevo nombre del tag
    let newName = "NEWTAG E0008";
    TagPage.writeNameTag(newName);
    cy.screenshot('../../ghost-5.96/E0008-7-RC');
    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos la nueva descripción del tag
    let newDescription = "NEW TAG DESCRIPCIÓN E0008";
    TagPage.writeDescriptionTag(newDescription);
    cy.screenshot('../../ghost-5.96/E0008-8-RC');
    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot('../../ghost-5.96/E0008-9-RC');
    //When le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot('../../ghost-5.96/E0008-10-RC');
    //Then Valida Tag publicado en la lista de tags
    TagPage.busqueda(newName, "notClick");
  });
});
