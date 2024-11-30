import { LogIn } from "../pages/logIn";
import { Settings } from "../pages/settingsPage";
import { PrincipalPage } from "../pages/principalPage";
import { IntegrationsPage } from "../pages/integrationsPage";
import { FakerGenerador } from "../fixtures/generateRandom";

//Manejo de excepciones
Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false;
  }
});

describe("Escenarios E00019 - E00023", function () {
  beforeEach(() => {
    cy.fixture("properties.json").then((data) => {
      //Vistamos sitio de Ghost
      cy.visit(data.baseURL);

      //Iniciamos sesion
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot("ss");
      cy.viewport(1536, 960);
      cy.wait(1000);
    });
  });

  it("E0019 - Crear una API de integración con nombre y descripción (Aleatorio)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(2000);
    cy.screenshot("ss");

    //And le doy click en analytics
    Settings.clickIntegrations();
    cy.wait(1000);

    //And el administrador debería ver la página de integraciones
    IntegrationsPage.validateAdvancedSection();

    //And le de click en el boton Add custom integration
    IntegrationsPage.clickAddCustomIntegration();
    cy.wait(1000);
    cy.screenshot("ss");

    //And escriba el nombre de la integración
    let title = FakerGenerador.generateRandomData();
    IntegrationsPage.addCustomIntegrationTitle(title);
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    IntegrationsPage.clickAddButton();
    cy.wait(1000);
    cy.screenshot("ss");

    //And Valida el título
    IntegrationsPage.validateTitle(title);

    //And escriba la descripción de la integración
    let description = FakerGenerador.generateRandomData();

    //And Agrega la descripción
    IntegrationsPage.addDescription(description);

    //And Hace clic en el botón "Save"
    IntegrationsPage.clickSaveButton();
    cy.wait(1000);
    cy.screenshot("ss");

    //When Hace clic en el botón "Close"
    IntegrationsPage.clickCloseButton();
    cy.wait(1000);

    //Then Valida que el título esté en el listado
    IntegrationsPage.validateTitleInList(title);
    cy.screenshot("ss");
  });

  it("E0020 - Editar una API de integración con nombre y descripción (Aleatorio)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(2000);
    cy.screenshot("ss");

    //And le doy click en analytics
    Settings.clickIntegrations();
    cy.wait(1000);

    //And el administrador debería ver la página de integraciones
    IntegrationsPage.validateAdvancedSection();

    //And le de click en el boton Add custom integration
    IntegrationsPage.clickAddCustomIntegration();
    cy.wait(1000);
    cy.screenshot("ss");

    //And escriba el nombre de la integración
    let title = FakerGenerador.generateRandomData();
    IntegrationsPage.addCustomIntegrationTitle(title);
    cy.wait(1000);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    IntegrationsPage.clickAddButton();
    cy.wait(1000);
    cy.screenshot("ss");

    //And Valida el título
    IntegrationsPage.validateTitle(title);

    //And escriba la descripción de la integración
    let description = FakerGenerador.generateRandomData();

    //And Agrega la descripción
    IntegrationsPage.addDescription(description);

    //And Hace clic en el botón "Save"
    IntegrationsPage.clickSaveButton();
    cy.wait(1000);
    cy.screenshot("ss");

    //And Hace clic en el botón "Close"
    IntegrationsPage.clickCloseButton();
    cy.wait(1000);

    //And Valida que el título esté en el listado
    IntegrationsPage.validateTitleInList(title);
    cy.screenshot("ss");

    //And Edita el registro creado
    IntegrationsPage.clicIntegration(title);
    cy.wait(1000);
    IntegrationsPage.clicIntegrationTitle();

    //And Edita el título
    let titleEditado = FakerGenerador.generateRandomData();

    //And Edita el título
    IntegrationsPage.editCustomIntegrationTitle(titleEditado);

    //And escriba la descripción de la integración
    let descriptionEditada = FakerGenerador.generateRandomData();

    //And Agrega la descripción
    IntegrationsPage.editCustomIntegrationDescription(descriptionEditada);

    //And Hace clic en el botón "Save"
    IntegrationsPage.clickSaveButton();
    cy.wait(1000);
    cy.screenshot("ss");

    //When Hace clic en el botón "Close"
    IntegrationsPage.clickCloseButton();
    cy.wait(1000);

    //Then Valida que el título esté en el listado
    IntegrationsPage.validateTitleInList(titleEditado);
  });

  it("E0021 - Eliminar una API de integración con nombre y descripción (Aleatorio)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(2000);
    cy.screenshot("ss");

    //And le doy click en analytics
    Settings.clickIntegrations();
    cy.wait(1000);

    //And el administrador debería ver la página de integraciones
    IntegrationsPage.validateAdvancedSection();

    //And le de click en el boton Add custom integration
    IntegrationsPage.clickAddCustomIntegration();
    cy.wait(1000);
    cy.screenshot("ss");

    //And escriba el nombre de la integración
    let title = FakerGenerador.generateRandomData();
    IntegrationsPage.addCustomIntegrationTitle(title);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    IntegrationsPage.clickAddButton();
    cy.wait(1000);
    cy.screenshot("ss");

    //And Valida el título
    IntegrationsPage.validateTitle(title);

    //And escriba la descripción de la integración
    let description = FakerGenerador.generateRandomData();

    //And Agrega la descripción
    IntegrationsPage.addDescription(description);

    //And Hace clic en el botón "Save"
    IntegrationsPage.clickSaveButton();
    cy.wait(1000);
    cy.screenshot("ss");

    //And Hace clic en el botón "Close"
    IntegrationsPage.clickCloseButton();
    cy.wait(1000);

    //And le doy click en analytics
    Settings.clickIntegrations();
    cy.wait(1000);
    //And Valida que el título esté en el listado
    IntegrationsPage.clickTabCustumButton();
    cy.wait(1000);

    //And Valida que el título esté en el listado
    IntegrationsPage.validateTitleInList(title);
    cy.screenshot("ss");

    //And Elimina el registro creado
    IntegrationsPage.deleteIntegration(title);
    cy.wait(1000);

    //When Confirmar la eliminación
    IntegrationsPage.confirmDeleteIntegration();
    cy.wait(1000);
    cy.screenshot("ss");

    //Then Valida que el título no esté en el listado
    IntegrationsPage.validateIntegrationDeleted(title);
    cy.screenshot("ss");
  });

  it("E0022 - Crear una API de integración con nombre y descripción duplicado (Aleatorio)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(2000);
    cy.screenshot("ss");

    //And le doy click en analytics
    Settings.clickIntegrations();
    cy.wait(1000);

    //And el administrador debería ver la página de integraciones
    IntegrationsPage.validateAdvancedSection();

    //And le de click en el boton Add custom integration
    IntegrationsPage.clickAddCustomIntegration();
    cy.wait(1000);
    cy.screenshot("ss");

    //And escriba el nombre de la integración
    let title = FakerGenerador.generateRandomData();
    IntegrationsPage.addCustomIntegrationTitle(title);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    IntegrationsPage.clickAddButton();
    cy.wait(1000);
    cy.screenshot("ss");

    //And Valida el título
    IntegrationsPage.validateTitle(title);

    //And escriba la descripción de la integración
    let description = FakerGenerador.generateRandomData();

    //And Agrega la descripción
    IntegrationsPage.addDescription(description);

    //And Hace clic en el botón "Save"
    IntegrationsPage.clickSaveButton();
    cy.wait(1000);
    cy.screenshot("ss");

    //And Hace clic en el botón "Close"
    IntegrationsPage.clickCloseButton();
    cy.wait(1000);

    //And Valida que el título esté en el listado
    IntegrationsPage.validateTitleInList(title);
    cy.screenshot("ss");

    //And le de click en el boton Add custom integration
    IntegrationsPage.clickAddCustomIntegration();
    cy.wait(1000);
    cy.screenshot("ss");

    //And escribe el nombre de la integración duplicado
    IntegrationsPage.addCustomIntegrationTitle(title);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    IntegrationsPage.clickAddButton();
    cy.wait(1000);
    cy.screenshot("ss");

    //And Valida el título
    IntegrationsPage.validateTitle(title);

    //And Agrega la descripción duplicada de la integración
    IntegrationsPage.addDescription(description);

    //And Hace clic en el botón "Save"
    IntegrationsPage.clickSaveButton();
    cy.wait(1000);
    cy.screenshot("ss");

    //When Hace clic en el botón "Close"
    IntegrationsPage.clickCloseButton();
    cy.wait(1000);

    //Then Valida que el título esté en el listado
    IntegrationsPage.validateTitleInList(title);
    cy.screenshot("ss");

  });

  it("E0023 - Crear una API de integración con nombre y descripción con caracteres especiales (Aleatorio)", function () {
    //Given que voy a los settings
    PrincipalPage.clickSettings();
    cy.wait(2000);
    cy.screenshot("ss");

    //And le doy click en analytics
    Settings.clickIntegrations();
    cy.wait(1000);

    //And el administrador debería ver la página de integraciones
    IntegrationsPage.validateAdvancedSection();

    //And le de click en el boton Add custom integration
    IntegrationsPage.clickAddCustomIntegration();
    cy.wait(1000);
    cy.screenshot("ss");

    //And escriba el nombre de la integración
    let title = FakerGenerador.randomSpecialCharacters(5);
    IntegrationsPage.addCustomIntegrationTitle(title);
    cy.screenshot("ss");

    //And le de click en el boton guardar
    IntegrationsPage.clickAddButton();
    cy.wait(1000);
    cy.screenshot("ss");

    //And Valida el título
    IntegrationsPage.validateTitle(title);

    //And escriba la descripción de la integración
    let description = FakerGenerador.randomSpecialCharacters(15);

    //And Agrega la descripción
    IntegrationsPage.addDescription(description);

    //And Hace clic en el botón "Save"
    IntegrationsPage.clickSaveButton();
    cy.wait(1000);
    cy.screenshot("ss");

    //When Hace clic en el botón "Close"
    IntegrationsPage.clickCloseButton();
    cy.wait(1000);

    //Then Valida que el título esté en el listado
    IntegrationsPage.validateTitleInList(title);
    cy.screenshot("ss");
  });
});
