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
  return false;
});

describe("Escenarios E2E para Ghost", function () {
  beforeEach(() => {
    cy.fixture('properties.json').then((data) => {
      cy.visit(data.baseURL);
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot('../../ghost-5.96/E00020-0-RC');
      cy.wait(1000);
    });
  });

  it("E00020 - Delete Member", function () {
    //Given que voy a la sección de members
    PrincipalPage.visitMembers(BASE_URL);

    const memberData = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.sentence(),
    };

    cy.wait(3000);
    cy.screenshot('../../ghost-5.96/E00020-1-RC');

    //And verifico que estoy en la página de members
    MembersPage.getScreenTitle().should("include.text", "Members");
    cy.screenshot('../../ghost-5.96/E00020-2-RC');

    //And doy click en el boton de nuevo member
    MembersPage.clickNewMemberButton();
    cy.wait(3000);
    cy.screenshot('../../ghost-5.96/E00020-3-RC');

    //And lleno el formulario de member
    MembersPage.fillMemberForm(memberData);
    cy.screenshot('../../ghost-5.96/E00020-4-RC');

    //And doy click en el boton de guardar
    MembersPage.clickSaveButton();
    cy.wait(3000);
    cy.screenshot('../../ghost-5.96/E00020-5-RC');

    //And voy a la lista de members
    MembersPage.goToMembersList();
    cy.wait(2000);
    cy.screenshot('../../ghost-5.96/E00020-6-RC');

    //And doy click en el member por email
    MembersPage.clickMemberByEmail(memberData.email);
    cy.screenshot('../../ghost-5.96/E00020-7-RC');

    //And doy click en el boton de acciones
    MembersPage.openMemberActions();
    cy.screenshot('../../ghost-5.96/E00020-8-RC');

    //And doy click en el boton de eliminar
    MembersPage.clickDeleteMember();
    cy.wait(2000);
    cy.screenshot('../../ghost-5.96/E00020-9-RC');

    //When confirmo que quiero eliminar el member
    MembersPage.confirmDeleteMember();
    cy.screenshot('../../ghost-5.96/E00020-10-RC');

    //Then verifico que el member ya no existe
    MembersPage.getMembersList().then((membersList) => {
      const member = membersList.find((m) => m.email === memberData.email);
      expect(member).to.be.undefined;
    });
    cy.screenshot('../../ghost-5.96/E00020-11-RC');

  });
});
