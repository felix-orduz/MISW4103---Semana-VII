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
      cy.visit('http://localhost:2368/ghost/#/signin');
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot('../../ghost-5.96/E0020-0-BS');
      cy.wait(1000);
    });
  });

  it("E00020 - Delete Member", function () {
    PrincipalPage.visitMembers(BASE_URL);

    const memberData = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.sentence(),
    };

    cy.wait(3000);
    cy.screenshot('../../ghost-5.96/E0020-1-BS');

    MembersPage.getScreenTitle().should("include.text", "Members");
    cy.screenshot('../../ghost-5.96/E0020-2-BS');

    MembersPage.clickNewMemberButton();
    cy.wait(3000);
    cy.screenshot('../../ghost-5.96/E0020-3-BS');

    MembersPage.fillMemberForm(memberData);
    cy.screenshot('../../ghost-5.96/E0020-4-BS');

    MembersPage.clickSaveButton();
    cy.wait(3000);
    cy.screenshot('../../ghost-5.96/E0020-5-BS');

    MembersPage.goToMembersList();
    cy.wait(2000);
    cy.screenshot('../../ghost-5.96/E0020-6-BS');

    MembersPage.clickMemberByEmail(memberData.email);
    cy.screenshot('../../ghost-5.96/E0020-7-BS');

    MembersPage.openMemberActions();
    cy.screenshot('../../ghost-5.96/E0020-8-BS');

    MembersPage.clickDeleteMember();
    cy.wait(2000);
    cy.screenshot('../../ghost-5.96/E0020-9-BS');

    MembersPage.confirmDeleteMember();
    cy.screenshot('../../ghost-5.96/E0020-10-BS');

    MembersPage.getMembersList().then((membersList) => {
      const member = membersList.find((m) => m.email === memberData.email);
      expect(member).to.be.undefined;
    });
    cy.screenshot('../../ghost-5.96/E0020-11-BS');

  });
});
