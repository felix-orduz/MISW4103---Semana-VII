import { faker } from "@faker-js/faker";
import { LogIn } from "../pages/logIn";
import { Settings } from "../pages/settingsPage";
import { PrincipalPage } from "../pages/principalPage";
import { FakerGenerador } from "../fixtures/generateRandom";

//JSONs de información
let data = require("../fixtures/properties.json");
let dataPoolTD = require("../fixtures/dataPoolT&D.json");
let dataPoolLang = require("../fixtures/dataPoolLang.json");
let dataPoolSocial = require("../fixtures/dataPoolSocial.json");

//Manejo de excepciones
Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false;
  }
});

describe("Escenarios E00022 - E00024", function () {
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

      //Guardamos la apiKey de posts
      let apiKey = data.apiKey;

      //Realizamos la solicitud a la API de Mockaroo
      cy.request({
        method: "GET",
        url: `https://my.api.mockaroo.com/t&d_schema.json?key=${apiKey}`,
      }).then((response) => {
        // Verificamos que la respuesta sea exitosa
        expect(response.status).to.eq(200);

        //Seleccionamos data para la prueba
        randomRow =
          response.body[Math.floor(Math.random() * response.body.length)];
      });
    });
  });

  it("E00022 - Editar título del sitio (A-priori)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot('ss');

    //And le doy click en title and description
    Settings.clickTitleDescr();

    //And le doy click en edit
    Settings.clickEditTitle();
    cy.screenshot('ss');

    //And cambio el titulo
    let titleEditado = dataPoolTD[0].tituloSitio;
    Settings.editTitle(titleEditado);
    cy.screenshot('ss');

    //When guardo los cambios
    Settings.saveChangesTitle();
    cy.wait(1000);

    //Then el titulo es el esperado
    Settings.validateTitle(titleEditado);
  });

  it("E00023 - Editar título del sitio (Pseudo)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot('ss');

    //And le doy click en title and description
    Settings.clickTitleDescr();

    //And le doy click en edit
    Settings.clickEditTitle();
    cy.screenshot('ss');

    //And cambio el titulo
    let titleEditado = randomRow.siteTitle;
    Settings.editTitle(titleEditado);
    cy.screenshot('ss');

    //When guardo los cambios
    Settings.saveChangesTitle();
    cy.wait(1000);

    //Then el titulo es el esperado
    Settings.validateTitle(titleEditado);
  });

  it("E00024 - Editar título del sitio (Aleatorio)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot('ss');

    //And le doy click en title and description
    Settings.clickTitleDescr();

    //And le doy click en edit
    Settings.clickEditTitle();
    cy.screenshot('ss');

    //When cambio el titulo
    let titleEditado = FakerGenerador.generateRandomData();
    Settings.editTitle(titleEditado);
    cy.screenshot('ss');

    //Then guardo los cambios
    Settings.saveChangesTitle();
  });
});

describe("Escenarios E00025 - E00027", function () {
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

      //Guardamos la apiKey de posts
      let apiKey = data.apiKey;

      //Realizamos la solicitud a la API de Mockaroo
      cy.request({
        method: "GET",
        url: `https://my.api.mockaroo.com/t&d_schema.json?key=${apiKey}`,
      }).then((response) => {
        // Verificamos que la respuesta sea exitosa
        expect(response.status).to.eq(200);

        //Seleccionamos data para la prueba
        randomRow =
          response.body[Math.floor(Math.random() * response.body.length)];
      });
    });
  });

  it("E00025 - Editar la descripción del sitio (A-priori)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot('ss');

    //And le doy click en title and description
    Settings.clickTitleDescr();

    //And le doy click en edit
    Settings.clickEditTitle();
    cy.screenshot('ss');

    //And cambio la descripción
    let descEditado = dataPoolTD[1].descripcionSitio;
    Settings.editDesc(descEditado);
    cy.screenshot('ss');

    //When guardo los cambios
    Settings.saveChangesTitle();
    cy.wait(1000);

    //Then el titulo es el esperado
    Settings.validateDesc(descEditado);
  });

  it("E00026 - Editar la descripción del sitio (Pseudo)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot('ss');

    //And le doy click en title and description
    Settings.clickTitleDescr();

    //And le doy click en edit
    Settings.clickEditTitle();
    cy.screenshot('ss');

    //And cambio la descripción
    let descEditado = randomRow.siteDescription;
    Settings.editDesc(descEditado);
    cy.screenshot('ss');

    //When guardo los cambios
    Settings.saveChangesTitle();
    cy.wait(1000);

    //Then el titulo es el esperado
    Settings.validateDesc(descEditado);
  });

  it("E00027 - Editar la descripción del sitio (Aleatorio)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot('ss');

    //And le doy click en title and description
    Settings.clickTitleDescr();

    //And le doy click en edit
    Settings.clickEditTitle();
    cy.screenshot('ss');

    //When cambio la descripción
    let descEditado = FakerGenerador.generateRandomData();
    Settings.editDesc(descEditado);
    cy.screenshot('ss');

    //Then guardo los cambios
    Settings.saveChangesTitle();
  });
});

describe("Escenarios E00028 - E00030", function () {
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

      //Guardamos la apiKey de posts
      let apiKey = data.apiKey;

      //Realizamos la solicitud a la API de Mockaroo
      cy.request({
        method: "GET",
        url: `https://my.api.mockaroo.com/lang_schema.json?key=${apiKey}`,
      }).then((response) => {
        // Verificamos que la respuesta sea exitosa
        expect(response.status).to.eq(200);

        //Seleccionamos data para la prueba
        randomRow =
          response.body[Math.floor(Math.random() * response.body.length)];
      });
    });
  });

  it("E00028 - Editar el lenguaje del sitio con números (A-priori)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot('ss');

    //And le doy click en publication language
    Settings.clickTitleLang();

    //And le doy click en edit
    Settings.clickEditLang();
    cy.screenshot('ss');

    //And cambio el language
    let langEditado = dataPoolLang[0].siteLanguage;
    Settings.editLang(langEditado);
    cy.screenshot('ss');

    //When guardo los cambios
    Settings.saveChangesLang();

    //Then el language es el esperado
    Settings.validateLanguage(langEditado);
  });

  it("E00029 - Editar el lenguaje del sitio con números (Pseudo)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot('ss');

    //And le doy click en publication language
    Settings.clickTitleLang();

    //And le doy click en edit
    Settings.clickEditLang();
    cy.screenshot('ss');

    //And cambio el language
    let langEditado = randomRow.language;
    Settings.editLang(langEditado);
    cy.screenshot('ss');

    //When guardo los cambios
    Settings.saveChangesLang();

    //Then el language es el esperado
    Settings.validateLanguage(langEditado);
  });

  it("E00030 - Editar el lenguaje del sitio con números (Aleatorio)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot('ss');

    //And le doy click en publication language
    Settings.clickTitleLang();

    //And le doy click en edit
    Settings.clickEditLang();
    cy.screenshot('ss');

    //When cambio el language
    let langEditado = faker.number.int();
    Settings.editLang(langEditado);
    cy.screenshot('ss');

    //Then guardo los cambios
    Settings.saveChangesLang();
  });
});

describe("Escenarios E00031 - E00033", function () {
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

      //Guardamos la apiKey de posts
      let apiKey = data.apiKey;

      //Realizamos la solicitud a la API de Mockaroo
      cy.request({
        method: "GET",
        url: `https://my.api.mockaroo.com/social_schema.json?key=${apiKey}`,
      }).then((response) => {
        // Verificamos que la respuesta sea exitosa
        expect(response.status).to.eq(200);

        //Seleccionamos data para la prueba
        randomRow =
          response.body[Math.floor(Math.random() * response.body.length)];
      });
    });
  });

  it("E00031 - Editar red social del sitio X(Twitter) número caracteres inválido  (A-priori)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot('ss');

    //And le doy click en social accounts
    Settings.clickSocial();

    //And le doy click en edit
    Settings.clickEditSocial();
    cy.screenshot('ss');

    //And cambio el titulo
    let socialEditado = 'https://x.com/ghost' + dataPoolSocial[0].xSocialPage;
    Settings.editSocial(socialEditado);
    cy.screenshot('ss');

    //When guardo los cambios
    Settings.cancelChangesSocial();

    //Then el language es el esperado
    Settings.validateSocial(socialEditado);
  });

  it("E00032 - Editar red social del sitio X(Twitter) número caracteres inválido  (Pseudo)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot('ss');

    //And le doy click en social accounts
    Settings.clickSocial();

    //And le doy click en edit
    Settings.clickEditSocial();
    cy.screenshot('ss');

    //And cambio el titulo
    let socialEditado = 'https://x.com/' + randomRow.xSocialPage;
    Settings.editSocial(socialEditado);
    cy.screenshot('ss');

    //When guardo los cambios
    Settings.cancelChangesSocial();

    //Then el language es el esperado
    Settings.validateSocial(socialEditado);
  });

  it("E00033 - Editar red social del sitio X(Twitter) número caracteres inválido  (Aleatorio)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot('ss');

    //And le doy click en social accounts
    Settings.clickSocial();

    //And le doy click en edit
    Settings.clickEditSocial();
    cy.screenshot('ss');

    //And cambio el titulo
    let socialEditado = 'https://x.com/ghost' + faker.string.alpha(20);
    Settings.editSocial(socialEditado);
    cy.screenshot('ss');

    //When guardo los cambios
    Settings.cancelChangesSocial();

    //Then el language es el esperado
    Settings.validateSocial(socialEditado);
  });
});