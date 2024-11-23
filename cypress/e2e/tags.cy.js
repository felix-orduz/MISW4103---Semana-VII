import { LogIn } from "../pages/logIn";
import { TagPage } from "../pages/tagPage";
import { PrincipalPage } from "../pages/principalPage";
import { FakerGenerador } from "../fixtures/generateRandom";
const data = require("../fixtures/properties.json");

let dataPoolTag = require("../fixtures/dataPoolTags.json");
let dataPoolTagsInvalid = require("../fixtures/dataPoolTagsInvalid.json");

Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false;
  }
});

describe("Escenarios E00034 - E00036", function () {
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

      //Guardamos la apiKey de posts
      let apiKey = data.apiKey;

      //Realizamos la solicitud a la API de Mockaroo
      cy.request({
        method: "GET",
        url: `https://my.api.mockaroo.com/tags_schema.json?key=${apiKey}`,
      }).then((response) => {
        // Verificamos que la respuesta sea exitosa
        expect(response.status).to.eq(200);

        //Seleccionamos data para la prueba
        randomRow =
          response.body[Math.floor(Math.random() * response.body.length)];
      });
    });
  });

  it("E00034 - Crear un tag con nombre y descripción (A-priori)", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot("ss");

    //And escriba el nombre del tag
    let name = dataPoolTag[0].tituloTag;
    TagPage.writeNameTag(name);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = dataPoolTag[0].descTag;
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

  it("E00035 - Crear un tag con nombre y descripción (Pseudo)", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot("ss");

    //And escriba el nombre del tag
    let name = randomRow.tituloTag;
    TagPage.writeNameTag(name);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = randomRow.descTag;
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

  it("E00036 - Crear un tag con nombre y descripción (Aleatorio)", function () {
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
});

describe("Escenarios E00037 - E00039", function () {
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

      //Guardamos la apiKey de posts
      let apiKey = data.apiKey;

      //Realizamos la solicitud a la API de Mockaroo
      cy.request({
        method: "GET",
        url: `https://my.api.mockaroo.com/tags_schema.json?key=${apiKey}`,
      }).then((response) => {
        // Verificamos que la respuesta sea exitosa
        expect(response.status).to.eq(200);

        //Seleccionamos data para la prueba
        randomRow =
          response.body[Math.floor(Math.random() * response.body.length)];
      });
    });
  });

  it("E00037 - Editar un tag con su descripción (A-priori)", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot("ss");

    //And escriba el nombre del tag
    let name = dataPoolTag[1].tituloTag;
    TagPage.writeNameTag(name);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = dataPoolTag[1].descTag;
    TagPage.writeDescriptionTag(description);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en la sección de Tags
    PrincipalPage.clickTags();

    //And Valida Tag publicado en la lista de tags
    TagPage.lastTagCreated(name, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos la nueva descripción del tag
    let newDescription = dataPoolTag[1].descTagEditado;
    TagPage.writeDescriptionTag(newDescription);
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

  it("E00038 - Editar un tag con su descripción (Pseudo)", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot("ss");

    //And escriba el nombre del tag
    let name = randomRow.tituloTag;
    TagPage.writeNameTag(name);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = randomRow.descTag;
    TagPage.writeDescriptionTag(description);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en la sección de Tags
    PrincipalPage.clickTags();

    //And Valida Tag publicado en la lista de tags
    TagPage.lastTagCreated(name, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos la nueva descripción del tag
    let newDescription = randomRow.descTagEditado;
    TagPage.writeDescriptionTag(newDescription);
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

  it("E00039 - Editar un tag con su descripción (Aleatorio)", function () {
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
    let description = FakerGenerador.generateRandomData();
    TagPage.writeDescriptionTag(description);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en la sección de Tags
    PrincipalPage.clickTags();

    //And Valida Tag publicado en la lista de tags
    TagPage.lastTagCreated(name, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos la nueva descripción del tag
    let newDescription = FakerGenerador.generateRandomData();
    TagPage.writeDescriptionTag(newDescription);
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

describe("Escenarios E00040 - E00042", function () {
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

      //Guardamos la apiKey de posts
      let apiKey = data.apiKey;

      //Realizamos la solicitud a la API de Mockaroo
      cy.request({
        method: "GET",
        url: `https://my.api.mockaroo.com/tags_schema.json?key=${apiKey}`,
      }).then((response) => {
        // Verificamos que la respuesta sea exitosa
        expect(response.status).to.eq(200);

        //Seleccionamos data para la prueba
        randomRow =
          response.body[Math.floor(Math.random() * response.body.length)];
      });
    });
  });

  it("E00040 - Editar un tag con titulo y descripción (A-priori)", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot("ss");

    //And escriba el nombre del tag
    let name = dataPoolTag[2].tituloTag;
    TagPage.writeNameTag(name);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = dataPoolTag[2].descTag;
    TagPage.writeDescriptionTag(description);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en la sección de Tags
    PrincipalPage.clickTags();

    //And Valida Tag publicado en la lista de tags
    TagPage.lastTagCreated(name, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //And escriba el nuevo nombre del tag
    let newName = dataPoolTag[2].tituloTagEditado;
    TagPage.writeNameTag(newName);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos la nueva descripción del tag
    let newDescription = dataPoolTag[2].descTagEditado;
    TagPage.writeDescriptionTag(newDescription);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //When le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //Then Valida Tag publicado en la lista de tags
    TagPage.busqueda(newName, "notClick");
  });

  it("E00041 - Editar un tag con titulo y descripción (Pseudo)", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot("ss");

    //And escriba el nombre del tag
    let name = randomRow.tituloTag;
    TagPage.writeNameTag(name);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = randomRow.descTag;
    TagPage.writeDescriptionTag(description);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en la sección de Tags
    PrincipalPage.clickTags();

    //And Valida Tag publicado en la lista de tags
    TagPage.lastTagCreated(name, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //And escriba el nuevo nombre del tag
    let newName = randomRow.tituloTagEditado;
    TagPage.writeNameTag(newName);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos la nueva descripción del tag
    let newDescription = randomRow.descTagEditado;
    TagPage.writeDescriptionTag(newDescription);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //When le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //Then Valida Tag publicado en la lista de tags
    TagPage.busqueda(newName, "notClick");
  });

  it("E00042 - Editar un tag con titulo y descripción (Aleatorio)", function () {
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
    let description = FakerGenerador.generateRandomData();
    TagPage.writeDescriptionTag(description);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en la sección de Tags
    PrincipalPage.clickTags();

    //And Valida Tag publicado en la lista de tags
    TagPage.lastTagCreated(name, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //And escriba el nuevo nombre del tag
    let newName = FakerGenerador.generateRandomData();
    TagPage.writeNameTag(newName);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos la nueva descripción del tag
    let newDescription = FakerGenerador.generateRandomData();
    TagPage.writeDescriptionTag(newDescription);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //When le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //Then Valida Tag publicado en la lista de tags
    TagPage.busqueda(newName, "notClick");
  });
});

describe("Escenarios E00043 - E00045", function () {
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

      //Guardamos la apiKey de posts
      let apiKey = data.apiKey;

      //Realizamos la solicitud a la API de Mockaroo
      cy.request({
        method: "GET",
        url: `https://my.api.mockaroo.com/tags_schema.json?key=${apiKey}`,
      }).then((response) => {
        // Verificamos que la respuesta sea exitosa
        expect(response.status).to.eq(200);

        //Seleccionamos data para la prueba
        randomRow =
          response.body[Math.floor(Math.random() * response.body.length)];
      });
    });
  });

  it("E00043 - Crear un tag duplicado nombre y la descripción (A-priori)", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot("ss");

    //And escriba el nombre del tag
    let name = dataPoolTag[3].tituloTag;
    TagPage.writeNameTag(name);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = dataPoolTag[3].descTag;
    TagPage.writeDescriptionTag(description);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //And Valida Tag publicado en la lista de tags
    TagPage.busqueda(name, "notClick");
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot("ss");

    //And escribimos la el nombre del tag anterior
    TagPage.writeNameTag(name);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos la descripción del tag anterior
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

  it("E00044 - Crear un tag duplicado nombre y la descripción (Pseudo)", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot("ss");

    //And escriba el nombre del tag
    let name = randomRow.tituloTag;
    TagPage.writeNameTag(name);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = randomRow.descTag;
    TagPage.writeDescriptionTag(description);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //And Valida Tag publicado en la lista de tags
    TagPage.busqueda(name, "notClick");
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot("ss");

    //And escribimos la el nombre del tag anterior
    TagPage.writeNameTag(name);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos la descripción del tag anterior
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

  it("E00045 - Crear un tag duplicado nombre y la descripción (Aleatorio)", function () {
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
    let description = FakerGenerador.generateRandomData();
    TagPage.writeDescriptionTag(description);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //And Valida Tag publicado en la lista de tags
    TagPage.busqueda(name, "notClick");
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot("ss");

    //And escribimos la el nombre del tag anterior
    TagPage.writeNameTag(name);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos la descripción del tag anterior
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

describe("Escenarios E00046 - E00048", function () {
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

      //Guardamos la apiKey de posts
      let apiKey = data.apiKey;

      //Realizamos la solicitud a la API de Mockaroo
      cy.request({
        method: "GET",
        url: `https://my.api.mockaroo.com/tags_schema.json?key=${apiKey}`,
      }).then((response) => {
        // Verificamos que la respuesta sea exitosa
        expect(response.status).to.eq(200);

        //Seleccionamos data para la prueba
        randomRow =
          response.body[Math.floor(Math.random() * response.body.length)];
      });
    });
  });

  it("E00046 - Eliminar un tag con titulo y descripción (A-priori)", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot("ss");

    //And escriba el nombre del tag
    let name = dataPoolTag[4].tituloTag;
    TagPage.writeNameTag(name);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = dataPoolTag[4].descTag;
    TagPage.writeDescriptionTag(description);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en la sección de Tags
    PrincipalPage.clickTags();

    //And Valida Tag publicado en la lista de tags
    TagPage.lastTagCreated(name, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //When le de click en el boton de eliminar
    TagPage.clickDeleteTag();
    cy.wait(1000);
    cy.screenshot("ss");

    //Then elimina el tag
    TagPage.clickDeleteConfirmTag();
  });

  it("E00047 - Eliminar un tag con titulo y descripción (Pseudo)", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot("ss");

    //And escriba el nombre del tag
    let name = randomRow.tituloTag;
    TagPage.writeNameTag(name);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = randomRow.descTag;
    TagPage.writeDescriptionTag(description);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en la sección de Tags
    PrincipalPage.clickTags();

    //And Valida Tag publicado en la lista de tags
    TagPage.lastTagCreated(name, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //When le de click en el boton de eliminar
    TagPage.clickDeleteTag();
    cy.wait(1000);
    cy.screenshot("ss");

    //Then elimina el tag
    TagPage.clickDeleteConfirmTag();
  });

  it("E00048 - Eliminar un tag con titulo y descripción (Aleatorio)", function () {
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
    let description = FakerGenerador.generateRandomData();
    TagPage.writeDescriptionTag(description);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    TagPage.clickNewTagSave();
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en la sección de Tags
    PrincipalPage.clickTags();

    //And Valida Tag publicado en la lista de tags
    TagPage.lastTagCreated(name, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //When le de click en el boton de eliminar
    TagPage.clickDeleteTag();
    cy.wait(1000);
    cy.screenshot("ss");

    //Then elimina el tag
    TagPage.clickDeleteConfirmTag();
  });
});

describe("Escenarios E00049 - E00051", function () {
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

      //Guardamos la apiKey de posts
      let apiKey = data.apiKey;

      //Realizamos la solicitud a la API de Mockaroo
      cy.request({
        method: "GET",
        url: `https://my.api.mockaroo.com/tags_invalid_schema.json?key=${apiKey}`,
      }).then((response) => {
        // Verificamos que la respuesta sea exitosa
        expect(response.status).to.eq(200);

        //Seleccionamos data para la prueba
        randomRow =
          response.body[Math.floor(Math.random() * response.body.length)];
      });
    });
  });

  it("E00049 - Crear tac con caracteres especiales (A-priori)", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot("ss");

    //And escriba el nombre del tag
    let name = dataPoolTagsInvalid[0].tituloTagSpecial;
    TagPage.writeNameTag(name);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = dataPoolTagsInvalid[0].descTagSpecial;
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

  it("E00050 - Crear tac con caracteres especiales (Pseudo)", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot("ss");

    //And escriba el nombre del tag
    let name = randomRow.tituloTagSpecial;
    TagPage.writeNameTag(name);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = randomRow.descTagSpecial;
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

  it("E00051 - Crear tac con caracteres especiales (Aleatorio)", function () {
    //Given le de click en la sección de Tags
    PrincipalPage.clickTags();
    cy.screenshot("ss");

    //And el administrador debería ver la página de listado de Tags
    TagPage.getTitleSection().should("include.text", "Tags");

    //And le de click en el boton New Tag
    TagPage.clickNewTag();
    cy.screenshot("ss");

    //And escriba el nombre del tag
    let name = FakerGenerador.randomSpecialCharacters(4);
    TagPage.writeNameTag(name);
    cy.screenshot("ss");

    //And le de click en la descripción del tag
    TagPage.clickDescriptionTag();

    //And escribimos descripción del tag
    let description = FakerGenerador.randomSpecialCharacters(10);
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
