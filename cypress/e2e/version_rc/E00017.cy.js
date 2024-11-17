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
      cy.visit('http://localhost:2368/ghost/#/signin');
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot('../../ghost-5.96/E0017-0-BS');
      cy.wait(1000);
    });
  });

  it("E00017 - Invalid Email Validation", function () {
    PrincipalPage.visitMembers(BASE_URL);

    const memberData = {
      name: faker.name.fullName(),
      email: "invalid-email-format", // Email inválido
      note: faker.lorem.sentence(),
    };

    cy.wait(3000);
    cy.screenshot('../../ghost-5.96/E0017-1-BS');

    MembersPage.getScreenTitle().should("include.text", "Members");
    cy.screenshot('../../ghost-5.96/E0017-2-BS');

    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    cy.screenshot('../../ghost-5.96/E0017-3-BS');

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    cy.screenshot('../../ghost-5.96/E0017-4-BS');

    MembersPage.fillMemberForm(memberData);
    cy.screenshot('../../ghost-5.96/E0017-5-BS');

    MembersPage.clickSaveButton();
    cy.wait(3000);
    cy.screenshot('../../ghost-5.96/E0017-6-BS');

    MembersPage.getInvalidEmailMessageElement().should('contain.text', 'Invalid Email.');
    cy.screenshot('../../ghost-5.96/E0017-7-BS');

  });
});
