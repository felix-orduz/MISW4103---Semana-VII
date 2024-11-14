const BASE_URL = "http://localhost:2368/";
import { LogIn } from "../../pages/version_rc/logIn";
import { MembersPage } from "../../pages/version_rc/membersPage";
import { PrincipalPage } from "../../pages/version_rc/principalPage";
import { faker } from "@faker-js/faker";
const data = require('../../fixtures/properties.json');

Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false;
  }
});

describe("Escenarios E2E para Ghost", function () {
  beforeEach(() => {
    cy.fixture('properties.json').then((data) => {
      //Given que estoy en la pagina del login del Admin
      cy.visit('http://localhost:2368/ghost/#/signin');

      //When inicio sesión con mis credenciales
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
    });
  });

  it("E00019 - Edit Member", function () {
    // When Crear un nuevo miembro
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(2000);
    MembersPage.getScreenTitle().should("include.text", "Members");
    MembersPage.clickNewMemberButton();
    cy.wait(2000);

    const initialMemberData = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.sentence(),
    };

    MembersPage.fillMemberForm(initialMemberData);
    MembersPage.clickSaveButton();

    // Then Volver a la lista de miembros y buscar el miembro creado
    MembersPage.goToMembersList();
    cy.wait(2000);

    MembersPage.clickMemberByEmail(initialMemberData.email);

    // Then Editar el nombre del miembro
    const updatedName = faker.name.fullName();
    cy.get('input[data-test-input="member-name"]').clear().type(updatedName);

    // Then Guardar los cambios
    MembersPage.clickSaveButton();
    MembersPage.goToMembersList();

    // Then Confirmar que el nombre ha cambiado en la lista
    cy.contains("p.gh-members-list-email", initialMemberData.email)
      .parent()
      .within(() => {
        cy.get("h3.gh-members-list-name").should("have.text", updatedName);
      });
  });
});
