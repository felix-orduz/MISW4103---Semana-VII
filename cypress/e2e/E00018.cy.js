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
      cy.screenshot('../../ghost-5.96/E00018-0-RC');
      cy.wait(1000);
    });
  });

  it("E00018 - Validación de Email Inválido y Longitud de Nota", function () {
    //Given que voy a la sección de members
    PrincipalPage.visitMembers(BASE_URL);

    const longNote = faker.lorem.words(100);
    const memberData = {
      name: faker.name.fullName(),
      email: "invalid-email-format", // Email inválido
      note: longNote,
    };

    cy.wait(2000);
    cy.screenshot('../../ghost-5.96/E00018-1-RC');

    //And verifico que estoy en la página de members
    MembersPage.getScreenTitle().should("include.text", "Members");
    cy.screenshot('../../ghost-5.96/E00018-2-RC');

    //And doy click en el boton de nuevo member
    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    cy.screenshot('../../ghost-5.96/E00018-3-RC');

    //And pongo un nuevo member
    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    cy.screenshot('../../ghost-5.96/E00018-4-RC');

    //And lleno el formulario de member
    MembersPage.fillMemberForm(memberData);
    cy.screenshot('../../ghost-5.96/E00018-5-RC');

    //And doy click en el boton de guardar
    MembersPage.clickSaveButton();
    cy.wait(3000);
    cy.screenshot('../../ghost-5.96/E00018-6-RC');
    
    //When verifico que el email es inválido
    MembersPage.getInvalidEmailMessageElement().should(
      "contain.text",
      "Invalid Email."
    );
    cy.screenshot('../../ghost-5.96/E00018-7-RC');

    //Then verifico que la longitud de la nota es mayor a 500
    MembersPage.getAlertWordCount()
    .should("have.css", "color", "rgb(226, 84, 64)")
    .and(($span) => {
      const charCount = parseInt($span.text().trim());
      expect(charCount).to.be.greaterThan(500);
    });
    cy.screenshot('../../ghost-5.96/E00018-8-RC');

  });
});
