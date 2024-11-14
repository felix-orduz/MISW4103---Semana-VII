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

  it("E00020 - Delete Member", function () {
    // When Crear un nuevo miembro
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(2000);
    MembersPage.getScreenTitle().should("include.text", "Members");
    MembersPage.clickNewMemberButton();
    cy.wait(2000);

    const memberData = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.sentence(),
    };

    MembersPage.fillMemberForm(memberData);
    MembersPage.clickSaveButton();

    // Then Volver a la lista de miembros y buscar el miembro creado
    MembersPage.goToMembersList();
    cy.wait(2000);

    // Then Seleccionar el miembro en la lista para editarlo
    MembersPage.clickMemberByEmail(memberData.email);

    // Then Abrir el menú de acciones y confirmar eliminación
    MembersPage.openMemberActions();
    MembersPage.clickDeleteMember();
    MembersPage.confirmDeleteMember();

    // Then Verificar que el miembro ya no está en la lista
    MembersPage.getMembersList().then((membersList) => {
      const member = membersList.find((m) => m.email === memberData.email);
      expect(member).to.be.undefined;
    });
  });
});
