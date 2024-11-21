import { faker } from "@faker-js/faker";
import { LogIn } from "../pages/logIn";
import { Settings } from "../pages/settings";
import { PrincipalPage } from "../pages/principalPage";

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
      cy.screenshot("../../ghost-5.96/E0000-0-RC");
      cy.wait(1000);
    });
  });

  it("E00016 - Editar título del sitio (A-priori)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);

    //And le doy click en title and description
    Settings.clickTitleDescr();

    //And le doy click en edit
    Settings.clickEditTitle();

    //When cambio el titulo
    let titleEditado = dataPool[0].tituloSitio;
    Settings.editTitle(titleEditado);

    //Then guardo los cambios
    Settings.saveChangesTitle();
  });

  it("E00017 - Editar título del sitio (Pseudo)", function () {
    //Creamos semilla para faker
    faker.seed(456);

    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);

    //And le doy click en title and description
    Settings.clickTitleDescr();

    //And le doy click en edit
    Settings.clickEditTitle();

    //When cambio el titulo
    let titleEditado = faker.lorem.word();
    Settings.editTitle(titleEditado);

    //Then guardo los cambios
    Settings.saveChangesTitle();
  });

  it("E00018 - Editar título del sitio (Aleatorio)", function () {
    //Creamos semilla de faker
    faker.seed();
    let randomCategory = faker.helpers.arrayElement(Object.keys(categoryMethods));
    let randomMethod = faker.helpers.objectKey(faker[randomCategory]);
    let randomData = faker[randomCategory][randomMethod]();

    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(1000);

    //And le doy click en title and description
    Settings.clickTitleDescr();

    //And le doy click en edit
    Settings.clickEditTitle();

    //When cambio el titulo
    let titleEditado = randomData;
    Settings.editTitle(titleEditado);

    //Then guardo los cambios
    Settings.saveChangesTitle();
  });
});