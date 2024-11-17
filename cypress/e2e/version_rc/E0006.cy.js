import { LogIn } from "../../pages/version_rc/logIn";
import { TagPage } from "../../pages/version_rc/tagPage";
import { PrincipalPage } from "../../pages/version_rc/principalPage";
import { faker } from '@faker-js/faker';
const data = require('../../fixtures/properties.json');

Cypress.on("uncaught:exception", (err, runnable) => {
    if (err.message.includes("The play() request was interrupted")) {
      return false;
    }
  });

describe('Escenarios E2E para Ghost', function () {

  beforeEach(() => {
    cy.fixture('properties.json').then((data) => {
        //Given que estoy en la pagina del login del Admin
        cy.visit(data.baseURL);

        //When inicio sesión con mis credenciales
        LogIn.logIn(data.email, data.password);
        LogIn.logInButton();
        cy.screenshot('../../ghost-5.96/E0006-0-RC');
        cy.wait(1000);
        cy.viewport(1536, 960);
    });
  });

    it('E0006 - Crear un tag con nombre y descripción', function () {
        //Given le de click en la sección de Tags
        PrincipalPage.clickTags();
        cy.screenshot('../../ghost-5.96/E0006-1-RC');
        //And el administrador debería ver la página de listado de Tags
        TagPage.getTitleSection().should('include.text', 'Tags');

        //And le de click en el boton New Tag
        TagPage.clickNewTag();
        cy.screenshot('../../ghost-5.96/E0006-2-RC');
        //And escriba el nombre del tag
        let name = "TAG E0006";
        TagPage.writeNameTag(name);
        cy.screenshot('../../ghost-5.96/E0006-3-RC');
        //And le de click en la descripción del tag
        TagPage.clickDescriptionTag();

        //And escribimos descripción del tag
        let description = "TAG DESCRIPCIÓN E0006";
        TagPage.writeDescriptionTag(description);
        cy.screenshot('../../ghost-5.96/E0006-4-RC');
        //And le de click en el boton guardar
        TagPage.clickNewTagSave();
        cy.wait(1000);
        cy.screenshot('../../ghost-5.96/E0006-5-RC');
       //When le de click en la sección de Tags
        PrincipalPage.clickTags(); 
        cy.screenshot('../../ghost-5.96/E0006-6-RC');
        //Then Valida Tag publicado en la lista de tags
        TagPage.busqueda(name, 'notClick');
    });
});