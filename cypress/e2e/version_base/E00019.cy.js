const BASE_URL = "http://localhost:2368/";
import { LogIn } from "../../pages/version_base/logIn";
import { MembersPage } from "../../pages/version_base/membersPage";
import { PrincipalPage } from "../../pages/version_base/principalPage";
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
      cy.screenshot('../../ghost-4.5/E0019-0-BS');
      cy.wait(1000);
    });
  });

  it("E00019 - Edit Member", function () {
    PrincipalPage.visitMembers(BASE_URL);

    const initialMemberData = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.sentence(),
    };

    cy.wait(2000);
    cy.screenshot('../../ghost-4.5/E0019-1-BS');

    MembersPage.getScreenTitle().should("include.text", "Members");
    cy.screenshot('../../ghost-4.5/E0019-2-BS');

    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    cy.screenshot('../../ghost-4.5/E0019-3-BS');

    MembersPage.fillMemberForm(initialMemberData);
    cy.screenshot('../../ghost-4.5/E0019-4-BS');

    MembersPage.clickSaveButton();
    cy.wait(3000);
    cy.screenshot('../../ghost-4.5/E0019-5-BS');

    MembersPage.goToMembersList();
    cy.wait(2000);
    cy.screenshot('../../ghost-4.5/E0019-6-BS');

    MembersPage.clickMemberByEmail(initialMemberData.email);
    cy.screenshot('../../ghost-4.5/E0019-7-BS');

    const updatedName = faker.name.fullName();
    MembersPage.clearAndFillMemberName(updatedName);
    cy.screenshot('../../ghost-4.5/E0019-8-BS');

    MembersPage.clickSaveButton();
    cy.wait(3000);
    cy.screenshot('../../ghost-4.5/E0019-9-BS');

    MembersPage.goToMembersList();
    cy.screenshot('../../ghost-4.5/E0019-10-BS');

    MembersPage.getMemberNameElement(initialMemberData.email).should("have.text", updatedName);
    cy.screenshot('../../ghost-4.5/E0019-11-BS');

  });
});
