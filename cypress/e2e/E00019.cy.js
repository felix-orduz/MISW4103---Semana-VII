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
      cy.visit(data.baseURL);
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot('../../ghost-5.96/E00019-0-RC');
      cy.wait(1000);
    });
  });

  it("E00019 - Edit Member", function () {
    //Given que voy a la sección de members
    PrincipalPage.visitMembers(BASE_URL);

    const initialMemberData = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.sentence(),
    };

    cy.wait(2000);
    cy.screenshot('../../ghost-5.96/E00019-1-RC');

    //And verifico que estoy en la página de members
    MembersPage.getScreenTitle().should("include.text", "Members");
    cy.screenshot('../../ghost-5.96/E00019-2-RC');

    //And doy click en el boton de nuevo member
    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    cy.screenshot('../../ghost-5.96/E00019-3-RC');

    //And lleno el formulario de member
    MembersPage.fillMemberForm(initialMemberData);
    cy.screenshot('../../ghost-5.96/E00019-4-RC');

    //And doy click en el boton de guardar
    MembersPage.clickSaveButton();
    cy.wait(3000);
    cy.screenshot('../../ghost-5.96/E00019-5-RC');

    //And voy a la lista de members
    MembersPage.goToMembersList();
    cy.wait(2000);
    cy.screenshot('../../ghost-5.96/E00019-6-RC');

    //And doy click en el member por email
    MembersPage.clickMemberByEmail(initialMemberData.email);
    cy.screenshot('../../ghost-5.96/E00019-7-RC');

    //And borro el nombre y pongo uno nuevo
    const updatedName = faker.name.fullName();
    MembersPage.clearAndFillMemberName(updatedName);
    cy.screenshot('../../ghost-5.96/E00019-8-RC');

    //And doy click en el boton de guardar
    MembersPage.clickSaveButton();
    cy.wait(3000);
    cy.screenshot('../../ghost-5.96/E00019-9-RC');

    //When voy a la lista de members
    MembersPage.goToMembersList();
    cy.screenshot('../../ghost-5.96/E00019-10-RC');

    //Then verifico que el nombre del member se actualizó
    MembersPage.getMemberNameElement(initialMemberData.email).should("have.text", updatedName);
    cy.screenshot('../../ghost-5.96/E00019-11-RC');

  });
});
