const BASE_URL = "http://localhost:2368/";
import { LogIn } from "../../pages/version_rc/logIn";
import { MembersPage } from "../../pages/version_rc/membersPage";
import { PrincipalPage } from "../../pages/version_rc/principalPage";
import { faker } from "@faker-js/faker";
const data = require('../../fixtures/properties.json');

// Configuración para ignorar una excepción específica que podría interrumpir la prueba
Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false; // Ignorar esta excepción específica relacionada con la interrupción de play()
  }
  // Permitir que otras excepciones no controladas se manejen normalmente
});

describe("Escenarios E2E para Ghost", function () {
  beforeEach(() => {
    cy.fixture('properties.json').then((data) => {
      cy.visit(data.baseURL);
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot('../../ghost-5.96/E00017-0-RC');
      cy.wait(1000);
    });
  });

  it("E00017 - Invalid Email Validation", function () {
    //Given que voy a la sección de members
    PrincipalPage.visitMembers(BASE_URL);

    const memberData = {
      name: faker.name.fullName(),
      email: "invalid-email-format", // Email inválido
      note: faker.lorem.sentence(),
    };

    cy.wait(3000);
    cy.screenshot('../../ghost-5.96/E00017-1-RC');

    //And verifico que estoy en la página de members
    MembersPage.getScreenTitle().should("include.text", "Members");
    cy.screenshot('../../ghost-5.96/E00017-2-RC');

    //And doy click en el boton de nuevo member
    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    cy.screenshot('../../ghost-5.96/E00017-3-RC');

    //And pongo un nuevo member
    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    cy.screenshot('../../ghost-5.96/E00017-4-RC');
    
    //And lleno el formulario de member
    MembersPage.fillMemberForm(memberData);
    cy.screenshot('../../ghost-5.96/E00017-5-RC');
    
    //When doy click en el boton de save
    MembersPage.clickSaveButton();
    cy.wait(3000);
    cy.screenshot('../../ghost-5.96/E00017-6-RC');
    
    //Then se muestra un mensaje de error
    MembersPage.getInvalidEmailMessageElement().should('contain.text', 'Invalid Email.');
    cy.screenshot('../../ghost-5.96/E00017-7-RC');

  });
});
