import { LogIn } from "../pages/logIn";
import { TagPage } from "../pages/tagPage";
import { PrincipalPage } from "../pages/principalPage";
import { FakerGenerador } from "../fixtures/generateRandom";
const data = require("../fixtures/properties.json");

//Manejo de excepciones
Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false;
  }
});

describe("Escenarios E00017 - E00018", function () {
  let randomRow;

  beforeEach(() => {
    cy.fixture("properties.json").then((data) => {
      //Vistamos sitio de Ghost
      cy.visit(data.baseURL);

      //Iniciamos sesion
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot("ss");
      cy.wait(1000);
      cy.viewport(1536, 960);
    });
  });

  it("E00017 - Crear un tag con nombre con mas de 150 Carácteres.", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot("ss");

    //And escriba el nombre del tag
    let name =
      "Innovaciones Tecnológicas del 2024: Cómo las Nuevas Tendencias están Transformando el Mundo y la Vida Cotidiana";
    TagPage.writeNameTag(name);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = FakerGenerador.generateRandomData();
    TagPage.writeDescriptionTag(description);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //When le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //Then Valida Tag publicado en la lista de tags
    TagPage.busqueda(name, "notClick");
  });

  it("E00018 - Crear un tag con nombre y descripción con mas de 500 Carácteres.", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot("ss");

    //And escriba el nombre del tag
    let name = FakerGenerador.generateRandomData();
    TagPage.writeNameTag(name);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = "Innovaciones tecnológicas han alcanzado y transformando radicalmente el mundo y nuestra vida cotidiana. Desde la inteligencia artificial avanzada hasta la realidad aumentada, las nuevas tendencias redefiniendo cómo interactuamos con nuestro entorno y entre nosotros. Estas tecnologías no solo están mejorando la eficiencia, sino que también están abriendo nuevas posibilidades en campos como la medicina, la educación y el entretenimiento, creando un futuro más conectado y próspero para todos.";
    TagPage.writeDescriptionTag(description);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //When le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //Then Valida Tag publicado en la lista de tags
    TagPage.busqueda(name, "notClick");
  });

});