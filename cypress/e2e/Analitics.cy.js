import { LogIn } from "../pages/logIn";
import { Settings } from "../pages/settingsPage";
import { PrincipalPage } from "../pages/principalPage";

//Manejo de excepciones
Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false;
  }
});

describe("Escenarios E00024 - E00027", function () {
  
    beforeEach(() => {
      cy.fixture("properties.json").then((data) => {
        //Vistamos sitio de Ghost
        cy.visit(data.baseURL);
  
        //Iniciamos sesion
        LogIn.logIn(data.email, data.password);
        LogIn.logInButton();
        cy.screenshot("ss");
        cy.viewport(1536, 960)
        cy.wait(1000);
      });
    });
  
    it("E0024 - Deshabilitar Analitics Newsletter Opens", function () {
      //Given que voy a los settings
      PrincipalPage.clickSettings();
      cy.wait(2000);
      cy.screenshot('ss');
  
      //And le doy click en analytics
      Settings.clickAnalytics();
      cy.wait(1000);
      
      //And le doy click check en Newsletter opens
      Settings.disableAnalyticsButton('button#\\:re\\:'); // Deshabilita "Newsletter Opens"
      cy.wait(1000);
      cy.screenshot('ss');
      //And le doy click en analytics
      Settings.clickAnalytics();
      cy.wait(2000);
      //When le doy click Guardar cambios
      Settings.clickSaveChangesAnalytics();
      cy.wait(1000);
      cy.screenshot('ss');
  
      //Then el boton este deshabilitado
      Settings.validateAnalyticsButton("button#\\:re\\:", "aria-checked", "false");
    });
    
    it("E0025 - Deshabilitar Analitics Member sources", function () {
      //Given que voy a los settings
      PrincipalPage.clickSettings();
      cy.wait(2000);
      cy.screenshot('ss');
  
      //And le doy click en analytics
      Settings.clickAnalytics();
      cy.wait(1000);
      
      //And le doy click check en Member sources
      Settings.disableAnalyticsButton('button#\\:rg\\:'); // Deshabilita "Member sources"
      cy.wait(1000);
      cy.screenshot('ss');
      //And le doy click en analytics
      Settings.clickAnalytics();
      cy.wait(2000);
      //When le doy click Guardar cambios
      Settings.clickSaveChangesAnalytics();
      cy.wait(1000);
      cy.screenshot('ss');
  
      //Then el boton este deshabilitado
      Settings.validateAnalyticsButton("button#\\:rg\\:", "aria-checked", "false");
    });

    it("E0026 - Deshabilitar Analitics Newsletter clicks", function () {
      //Given que voy a los settings
      PrincipalPage.clickSettings();
      cy.wait(2000);
      cy.screenshot('ss');
  
      //And le doy click en analytics
      Settings.clickAnalytics();
      cy.wait(1000);
      
      //And le doy click check en Newsletter clicks
      Settings.disableAnalyticsButton('button#\\:rf\\:'); // Deshabilita "Newsletter clicks"
      cy.wait(1000);
      cy.screenshot('ss');
      //And le doy click en analytics
      Settings.clickAnalytics();
      cy.wait(2000);
      //When le doy click Guardar cambios
      Settings.clickSaveChangesAnalytics();
      cy.wait(1000);
      cy.screenshot('ss');
  
      //Then el boton este deshabilitado
      Settings.validateAnalyticsButton("button#\\:rf\\:", "aria-checked", "false");
    });

    it("E0027 - Deshabilitar Outbound link tagging", function () {
      //Given que voy a los settings
      PrincipalPage.clickSettings();
      cy.wait(2000);
      cy.screenshot('ss');
  
      //And le doy click en analytics
      Settings.clickAnalytics();
      cy.wait(1000);

      //And le doy click check en Outbound link tagging
      Settings.disableAnalyticsButton('button#\\:rh\\:'); // Deshabilita "Outbound link tagging"
      cy.wait(1000);
      cy.screenshot('ss');
      //And le doy click en analytics
      Settings.clickAnalytics();
      cy.wait(2000);
      //When le doy click Guardar cambios
      Settings.clickSaveChangesAnalytics();
      cy.wait(1000);
      cy.screenshot('ss');
  
      //Then el boton este deshabilitado
      Settings.validateAnalyticsButton("button#\\:rh\\:", "aria-checked", "false");
    });
    
  });
  