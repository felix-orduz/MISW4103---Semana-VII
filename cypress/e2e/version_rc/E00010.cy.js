import { LogIn } from "../../pages/version_rc/logIn";
import { TagPage } from "../../pages/version_rc/tagPage";
import { PrincipalPage } from "../../pages/version_rc/principalPage";
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
        cy.screenshot('../../ghost-5.96/E00010-0-RC');
        cy.wait(1000);
    });
  });

  it("E00010 - Crear tac con caracteres especiales.", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot('../../ghost-5.96/E00010-1-RC');
    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot('../../ghost-5.96/E00010-2-RC');
    //And escriba el nombre del tag
    let name = "$%&$%&$%";
    TagPage.writeNameTag(name);
    cy.screenshot('../../ghost-5.96/E00010-3-RC');
    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = "dsfghjklhjfgchgjkjlñl34567890345678";
    TagPage.writeDescriptionTag(description);
    cy.screenshot('../../ghost-5.96/E00010-4-RC');
    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot('../../ghost-5.96/E00010-5-RC');
    //When le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot('../../ghost-5.96/E00010-6-RC');
    //Then Valida Tag publicado en la lista de tags
    TagPage.busqueda(name, "notClick");
  });
});
