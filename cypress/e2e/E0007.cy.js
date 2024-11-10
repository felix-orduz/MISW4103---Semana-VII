import { LogIn } from "../pages/logIn";
import { TagPage } from "../pages/tagPage";
import { PrincipalPage } from "../pages/principalPage";
import { faker } from "@faker-js/faker";

describe("Escenarios E2E para Ghost", function () {
  beforeEach(() => {
    //Given que estoy en la pagina del login del Admin
    cy.visit("http://localhost:2368/ghost/#/signin");

    //When inicio sesión con mis credenciales
    LogIn.logIn('d.andrades@uniandes.edu.co', 'ArpolisVI204*');
    LogIn.logInButton();
  });

  it("E0007 - Editar un tag con su descripción", function () {
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
    TagPage.busqueda_II(name, "click");
    cy.wait(1000);

    //When le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //Then escribimos la nueva descripción del tag
    let newDescription = faker.lorem.words();
    TagPage.writeDescriptionTag(newDescription);

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);

    //When le de click en la sección de Tags
    PrincipalPage.clickTags();

    //Then Valida Tag publicado en la lista de tags
    TagPage.busqueda_II(name, "notClick");
  });
});
