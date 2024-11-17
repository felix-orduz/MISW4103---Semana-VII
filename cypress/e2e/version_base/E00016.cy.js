const fs = require("fs");
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
        //Vistamos sitio de Ghost
        cy.visit(data.baseURL);

        //Iniciamos sesion
        LogIn.logIn(data.email, data.password);
        LogIn.logInButton();
        cy.screenshot('../../ghost-4.5/E0016-0-BS');
        cy.wait(1000);
    });
});

  it("E00016 - Crear Member", function () {
    // When Navegar a la sección de miembros desde la página principal
    PrincipalPage.visitMembers(BASE_URL);

    const memberData = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.sentence(),
    };

    cy.wait(3000);
    cy.screenshot('../../ghost-4.5/E0016-1-BS');

    MembersPage.getScreenTitle().should("include.text", "Members");
    cy.screenshot('../../ghost-4.5/E0016-2-BS');
    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    cy.screenshot('../../ghost-4.5/E0016-3-BS');
    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    cy.screenshot('../../ghost-4.5/E0016-4-BS');
    MembersPage.fillMemberForm(memberData);
    cy.screenshot('../../ghost-4.5/E0016-5-BS');
    MembersPage.clickSaveButton();
    cy.wait(3000);
    cy.screenshot('../../ghost-4.5/E0016-6-BS');
    MembersPage.goToMembersList();
    cy.screenshot('../../ghost-4.5/E0016-7-BS');
    let memberFound = false;
    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });
    cy.screenshot('../../ghost-4.5/E0016-8-BS');
  });
});
