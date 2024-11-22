import { faker } from "@faker-js/faker";
import { LogIn } from "../pages/logIn";
import { Settings } from "../pages/settingsPage";
import { PrincipalPage } from "../pages/principalPage";
import { FakerGenerador } from "../fixtures/generateRandom";

//JSONs de información
let data = require("../fixtures/properties.json");
let dataPool = require("../fixtures/dataPoolSettings.json");

//Categorias faker
let categoryMethods = {
    name: ['fullName', 'firstName', 'lastName', 'jobTitle'],
    address: ['streetAddress', 'city', 'state', 'country', 'zipCode'],
    internet: ['email', 'userName', 'url', 'domainName', 'password'],
    commerce: ['productName', 'price', 'department', 'productDescription'],
    company: ['companyName', 'catchPhrase', 'industry'],
    finance: ['account', 'amount', 'currencyCode'],
    phone: ['phoneNumber'],
    lorem: ['word', 'sentence', 'paragraph'],
};

//Manejo de excepciones
Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false;
  }
});

describe("Escenarios E00016 - E00018", function () {
  beforeEach(() => {
    cy.fixture("properties.json").then((data) => {
      //Vistamos sitio de Ghost
      cy.visit(data.baseURL);

      //Iniciamos sesion
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot('ss');
      cy.wait(1000);
    });
  });

  it("E00016 - Editar título del sitio (A-priori)", function () {
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
    let titleEditado = dataPool[0].tituloSitio;
    Settings.editTitle(titleEditado);
    cy.screenshot('ss');

    //When guardo los cambios
    Settings.saveChangesTitle();
    cy.wait(1000);

    //Then el titulo es el esperado
    Settings.validateTitle(titleEditado);
  });

  it("E00017 - Editar título del sitio (Pseudo)", function () {
    //Creamos semilla para faker
    faker.seed(456);

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
    let titleEditado = faker.lorem.word();
    Settings.editTitle(titleEditado);
    cy.screenshot('ss');

    //When guardo los cambios
    Settings.saveChangesTitle();
    cy.wait(1000);

    //Then el titulo es el esperado
    Settings.validateTitle(titleEditado);
  });

  it("E00018 - Editar título del sitio (Aleatorio)", function () {
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

describe("Escenarios E00019 - E00021", function () {
  beforeEach(() => {
    cy.fixture("properties.json").then((data) => {
      //Vistamos sitio de Ghost
      cy.visit(data.baseURL);

      //Iniciamos sesion
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot('ss');
      cy.wait(1000);
    });
  });

  it("E00019 - Editar la descripción del sitio (A-priori)", function () {
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
    let descEditado = dataPool[1].descripcionSitio;
    Settings.editDesc(descEditado);
    cy.screenshot('ss');

    //When guardo los cambios
    Settings.saveChangesTitle();
    cy.wait(1000);

    //Then el titulo es el esperado
    Settings.validateDesc(descEditado);
  });

  it("E00020 - Editar la descripción del sitio (Pseudo)", function () {
    //Creamos semilla para faker
    faker.seed(456);

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
    let descEditado = faker.lorem.words();
    Settings.editDesc(descEditado);
    cy.screenshot('ss');

    //When guardo los cambios
    Settings.saveChangesTitle();
    cy.wait(1000);

    //Then el titulo es el esperado
    Settings.validateDesc(descEditado);
  });

  it("E00021 - Editar la descripción del sitio (Aleatorio)", function () {
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

describe("Escenarios E00022 - E00024", function () {
  beforeEach(() => {
    cy.fixture("properties.json").then((data) => {
      //Vistamos sitio de Ghost
      cy.visit(data.baseURL);

      //Iniciamos sesion
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot('ss');
      cy.wait(1000);
    });
  });

  it("E00022 - Editar el lenguaje del sitio con idioma válido (A-priori)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot('ss');

    //And le doy click en title and description
    Settings.clickTitleLang();

    //And le doy click en edit
    Settings.clickEditLang();
    cy.screenshot('ss');

    //And cambio el titulo
    let langEditado = dataPool[0].lenguajeSitio;
    Settings.editTitle(langEditado);
    cy.screenshot('ss');

    //When guardo los cambios
    Settings.saveChangesLang();

    //Then el language es el esperado
    Settings.validateLanguage(langEditado);
  });

  it("E00023 - Editar el lenguaje del sitio con idioma válido (Pseudo)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);
    cy.screenshot('ss');

    //And le doy click en title and description
    Settings.clickTitleLang();

    //And le doy click en edit
    Settings.clickEditLang();
    cy.screenshot('ss');

    //And cambio el titulo
    let langEditado = FakerGenerador.getRandomLanguage();
    Settings.editTitle(langEditado);
    cy.screenshot('ss');

    //When guardo los cambios
    Settings.saveChangesLang();

    //Then el language es el esperado
    Settings.validateLanguage(langEditado);
  });

  it("E00024 - Editar el lenguaje del sitio con idioma válido (Aleatorio)", function () {
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
    let langEditado = FakerGenerador.getRandomLanguage();
    Settings.editTitle(langEditado);
    cy.screenshot('ss');

    //Then guardo los cambios
    Settings.saveChangesLang();
  });
});