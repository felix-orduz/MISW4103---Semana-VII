const BASE_URL = "http://localhost:2368/";
import mockarooUtil from "../utils/MockarooUtil";
import { LogIn } from "../pages/logIn";
import { MembersPage } from "../pages/membersPage";
import { PrincipalPage } from "../pages/principalPage";
const membersData = require("../fixtures/membersData.json");
import { faker } from "@faker-js/faker";
var data = require("../fixtures/properties.json");
const fakerSeed = 1234;
import Chance from "chance";
const chance = new Chance();

let mockarooData = [];

Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false;
  }
});

describe("Escenarios E2E para Ghost", function () {
  beforeEach(() => {
    cy.fixture("membersSchema.json").then((fields) => {
      mockarooUtil.fetchMemberData(6, fields).then((data) => {
        mockarooData = data;
      });
    });

    cy.fixture("properties.json").then((data) => {
      cy.visit(data.baseURL);
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      // cy.screenshot('../../ghost-5.96/E00016-0-RC');
      cy.wait(3000);
    });
  });

  it("E00061 - Crear Member - datos a-priori", function () {
    PrincipalPage.visitMembers(BASE_URL);

    const memberData = membersData[0];

    cy.wait(5000);
    // cy.screenshot('../../ghost-5.96/E00016-1-RC');

    MembersPage.getScreenTitle().should("include.text", "Members");
    // cy.screenshot('../../ghost-5.96/E00016-2-RC');

    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    cy.screenshot("../../ghost-5.96/E00016-3-RC");

    //And pongo un nuevo member
    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    cy.screenshot("../../ghost-5.96/E00016-4-RC");

    //And lleno el formulario de member
    MembersPage.fillMemberForm(memberData);
    cy.screenshot("../../ghost-5.96/E00016-5-RC");

    //And doy click en el boton de save
    MembersPage.clickSaveButton();
    cy.wait(3000);
    cy.screenshot("../../ghost-5.96/E00016-6-RC");

    //When voy a la lista de members
    MembersPage.goToMembersList();
    cy.screenshot("../../ghost-5.96/E00016-7-RC");

    //Then verifico que el member fue creado
    let memberFound = false;
    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });
    cy.screenshot("../../ghost-5.96/E00016-8-RC");
  });

  it("E00062 - Crear Member - datos seudo aleatorios con semilla", function () {
    PrincipalPage.visitMembers(BASE_URL);

    faker.seed(fakerSeed);

    const memberData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.sentence(),
    };

    cy.wait(5000);

    MembersPage.getScreenTitle().should("include.text", "Members");
    MembersPage.clickNewMemberButton();
    cy.wait(2000);

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });

    MembersPage.fillMemberForm(memberData);
    MembersPage.clickSaveButton();
    cy.wait(3000);

    MembersPage.goToMembersList();

    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });
  });

  it("E00063 - Crear Member - datos aleatorios con Mookaroo", function () {
    PrincipalPage.visitMembers(BASE_URL);

    // faker.seed(fakerSeed);

    const memberData = mockarooData[0];

    cy.wait(5000);

    MembersPage.getScreenTitle().should("include.text", "Members");
    MembersPage.clickNewMemberButton();
    cy.wait(2000);

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });

    MembersPage.fillMemberForm(memberData);
    MembersPage.clickSaveButton();
    cy.wait(3000);

    MembersPage.goToMembersList();

    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });
  });

  it("E00064 - Crear Member - datos aleatorios con Faker", function () {
    PrincipalPage.visitMembers(BASE_URL);
    faker.seed(new Date().getTime() / 1000);

    const memberData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.sentence(),
    };

    cy.wait(5000);

    MembersPage.getScreenTitle().should("include.text", "Members");
    MembersPage.clickNewMemberButton();
    cy.wait(2000);

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });

    MembersPage.fillMemberForm(memberData);
    MembersPage.clickSaveButton();
    cy.wait(3000);

    MembersPage.goToMembersList();

    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });
  });

  it("E00065 - Crear Member - datos aleatorios con Chance", function () {
    PrincipalPage.visitMembers(BASE_URL);
    faker.seed(new Date().getTime() / 1000);

    const memberData = {
      name: chance.name(),
      email: chance.email(),
      note: chance.sentence(),
    };

    cy.wait(5000);

    MembersPage.getScreenTitle().should("include.text", "Members");
    MembersPage.clickNewMemberButton();
    cy.wait(2000);

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });

    MembersPage.fillMemberForm(memberData);
    MembersPage.clickSaveButton();
    cy.wait(3000);

    MembersPage.goToMembersList();

    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });
  });
});
