const BASE_URL = "http://localhost:2368/";
import { LogIn } from "../../pages/version_base/logIn";
import { MembersPage } from "../../pages/version_base/membersPage";
import { PrincipalPage } from "../../pages/version_base/principalPage";
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
      cy.screenshot('../../ghost-4.5/E0018-0-BS');
      cy.wait(1000);
    });
  });

  it("E0018 - Validación de Email Inválido y Longitud de Nota", function () {
    PrincipalPage.visitMembers(BASE_URL);

    const longNote = faker.lorem.words(100);
    const memberData = {
      name: faker.name.fullName(),
      email: "invalid-email-format", // Email inválido
      note: longNote,
    };

    cy.wait(3000);
    cy.screenshot('../../ghost-4.5/E0018-1-BS');

    MembersPage.getScreenTitle().should("include.text", "Members");
    cy.screenshot('../../ghost-4.5/E0018-2-BS');

    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    cy.screenshot('../../ghost-4.5/E0018-3-BS');

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    cy.screenshot('../../ghost-4.5/E0018-4-BS');

    MembersPage.fillMemberForm(memberData);
    cy.screenshot('../../ghost-4.5/E0018-5-BS');

    MembersPage.clickSaveButton();
    cy.wait(3000);
    cy.screenshot('../../ghost-4.5/E0018-6-BS');

    MembersPage.getInvalidEmailMessageElement().should(
      "contain.text",
      "Invalid Email."
    );
    cy.screenshot('../../ghost-4.5/E0018-7-BS');

    MembersPage.getAlertWordCount()
    .should("have.css", "color", "rgb(226, 84, 64)")
    .and(($span) => {
      const charCount = parseInt($span.text().trim());
      expect(charCount).to.be.greaterThan(500);
    });
    cy.screenshot('../../ghost-4.5/E0018-8-BS');

  });
});
