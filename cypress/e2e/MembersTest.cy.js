const BASE_URL = "http://localhost:2368/";
import mockarooUtil from "../utils/MockarooUtil";
import { LogIn } from "../pages/logIn";
import { MembersPage } from "../pages/membersPage";
import { PrincipalPage } from "../pages/principalPage";
import { faker } from "@faker-js/faker";
const fakerSeed = 1234;
let membersDataAPriori = [];
let mockarooData = [];
let mockarooData2 = [];
Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false;
  }
});

describe("Escenarios E2E para Ghost", function () {
  beforeEach(() => {
    cy.fixture("dataPoolMembers.json").then((data) => {
      membersDataAPriori = data;
    });

    cy.fixture("schemaMembers.json").then((fields) => {
      mockarooUtil.fetchMemberData(20, fields).then((data) => {
        mockarooData = data;
      });
    });

    cy.fixture("properties.json").then((data) => {
      cy.visit(data.baseURL);
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.wait(3000);
    });

    // mockarooUtil.fetchMemberData(6, [], 'MISW4103-MEMBERS').then((data) => {
    //   mockarooData2 = data;
    // });
  });

  it("E00061 - Crear Member - datos a-priori", function () {
    const memberData = membersDataAPriori[0];
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(6000);
    // cy.screenshot('../../ghost-5.96/E00016-2-RC');

    MembersPage.clickNewMemberButton();
    cy.wait(4000);
    cy.screenshot("../../ghost-5.96/E00016-3-RC");

    //And pongo un nuevo member
    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    // cy.screenshot("../../ghost-5.96/E00016-4-RC");

    //And lleno el formulario de member
    MembersPage.fillMemberForm(memberData);
    // cy.screenshot("../../ghost-5.96/E00016-5-RC");

    //And doy click en el boton de save
    MembersPage.clickSaveButton();
    cy.wait(3000);
    // cy.screenshot("../../ghost-5.96/E00016-6-RC");

    //When voy a la lista de members
    MembersPage.goToMembersList();
    // cy.screenshot("../../ghost-5.96/E00016-7-RC");

    //Then verifico que el member fue creado
    let memberFound = false;
    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });
    // cy.screenshot("../../ghost-5.96/E00016-8-RC");
  });

  it("E00062 - Crear Member - datos seudo aleatorios Mookaroo", function () {
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);

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
    cy.wait(5000);

    MembersPage.goToMembersList();
    cy.wait(5000);
    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });
  });

  it("E00063 - Crear Member - datos aleatorios con Faker", function () {
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    faker.seed(new Date().getTime() / 1000);

    const memberData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.sentence(),
    };

    cy.wait(2000);

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
    cy.wait(2000);

    MembersPage.goToMembersList();

    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });
  });

  it("E00064 - Invalid Email Validation - datos a-priori", function () {
    cy.wait(5000);
    const memberData = membersDataAPriori[1];
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(5000);
    MembersPage.getScreenTitle().should("include.text", "Members");
    // cy.screenshot('../../ghost-5.96/E00017-1-RC');

    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00017-3-RC');

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    // cy.screenshot('../../ghost-5.96/E00017-4-RC');

    MembersPage.fillMemberForm(memberData);
    // cy.screenshot('../../ghost-5.96/E00017-5-RC');

    MembersPage.clickSaveButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00017-6-RC');

    MembersPage.getInvalidEmailMessageElement().should('contain.text', 'Invalid Email.');
    // cy.screenshot('../../ghost-5.96/E00017-7-RC');

  });

  it("E00065 - Invalid Email Validation - datos seudo aleatorios Mookaroo", function () {
    cy.wait(5000);
    //Given que voy a la sección de members
    PrincipalPage.visitMembers(BASE_URL);

    const memberData = mockarooData[1];

    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00017-1-RC');

    //And verifico que estoy en la página de members
    MembersPage.getScreenTitle().should("include.text", "Members");
    // cy.screenshot('../../ghost-5.96/E00017-2-RC');

    //And doy click en el boton de nuevo member
    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00017-3-RC');

    //And pongo un nuevo member
    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    // cy.screenshot('../../ghost-5.96/E00017-4-RC');

    MembersPage.fillMemberFormInvalidEmail(memberData);
    // cy.screenshot('../../ghost-5.96/E00017-5-RC');

    MembersPage.clickSaveButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00017-6-RC');

    MembersPage.getInvalidEmailMessageElement().should('contain.text', 'Invalid Email.');
    // cy.screenshot('../../ghost-5.96/E00017-7-RC');

  });

  it("E00066 - Invalid Email Validation - Aleatorio Faker", function () {
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);

    faker.seed(new Date().getTime() / 1000);

    const memberData = {
      name: faker.person.fullName(),
      email: faker.person.fullName(),
      note: faker.lorem.sentence(),
    };

    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00017-1-RC');

    //And verifico que estoy en la página de members
    MembersPage.getScreenTitle().should("include.text", "Members");
    // cy.screenshot('../../ghost-5.96/E00017-2-RC');

    //And doy click en el boton de nuevo member
    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00017-3-RC');

    //And pongo un nuevo member
    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    // cy.screenshot('../../ghost-5.96/E00017-4-RC');

    //And lleno el formulario de member
    MembersPage.fillMemberFormInvalidEmail(memberData);
    // cy.screenshot('../../ghost-5.96/E00017-5-RC');

    MembersPage.clickSaveButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00017-6-RC');

    MembersPage.getInvalidEmailMessageElement().should('contain.text', 'Invalid Email.');
    // cy.screenshot('../../ghost-5.96/E00017-7-RC');

  });

  it("E00067 - Validación de Email Inválido y Longitud de Nota - datos a-priori", function () {
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);

    const memberData = membersDataAPriori[2];

    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00018-1-RC');

    //And verifico que estoy en la página de members
    MembersPage.getScreenTitle().should("include.text", "Members");
    // cy.screenshot('../../ghost-5.96/E00018-2-RC');

    //And doy click en el boton de nuevo member
    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00018-3-RC');

    //And pongo un nuevo member
    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    // cy.screenshot('../../ghost-5.96/E00018-4-RC');

    //And lleno el formulario de member
    MembersPage.fillMemberForm(memberData);
    // cy.screenshot('../../ghost-5.96/E00018-5-RC');

    //And doy click en el boton de guardar
    MembersPage.clickSaveButton();
    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00018-6-RC');

    //When verifico que el email es inválido
    MembersPage.getInvalidEmailMessageElement().should(
      "contain.text",
      "Invalid Email."
    );
    // cy.screenshot('../../ghost-5.96/E00018-7-RC');

    //Then verifico que la longitud de la nota es mayor a 500
    MembersPage.getAlertWordCount()
      .should("have.css", "color", "rgb(226, 84, 64)")
      .and(($span) => {
        const charCount = parseInt($span.text().trim());
        expect(charCount).to.be.greaterThan(500);
      });
    // cy.screenshot('../../ghost-5.96/E00018-8-RC');
  });

  it("E00068 - Validación de Email Inválido y Longitud de Nota - datos seudo aleatorios Mookaroo", function () {
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);

    const memberData = mockarooData[2];

    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00018-3-RC');

    //And pongo un nuevo member
    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    // cy.screenshot('../../ghost-5.96/E00018-4-RC');

    //And lleno el formulario de member
    MembersPage.fillMemberFormInvalidEmailAndNote(memberData);
    // cy.screenshot('../../ghost-5.96/E00018-5-RC');

    //And doy click en el boton de guardar
    MembersPage.clickSaveButton();
    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00018-6-RC');

    //When verifico que el email es inválido
    MembersPage.getInvalidEmailMessageElement().should(
      "contain.text",
      "Invalid Email."
    );
    // cy.screenshot('../../ghost-5.96/E00018-7-RC');

    //Then verifico que la longitud de la nota es mayor a 500
    MembersPage.getAlertWordCount()
      .should("have.css", "color", "rgb(226, 84, 64)")
      .and(($span) => {
        const charCount = parseInt($span.text().trim());
        expect(charCount).to.be.greaterThan(500);
      });
    // cy.screenshot('../../ghost-5.96/E00018-8-RC');
  });

  it("E00069 - Validación de Email Inválido y Longitud de Nota - Aleatorio Faker", function () {
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    faker.seed(new Date().getTime() / 1000);

    const memberData = {
      name: faker.person.fullName(),
      email: faker.person.fullName(),
      note: faker.lorem.words(100),
    };

    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00018-3-RC');

    //And pongo un nuevo member
    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    // cy.screenshot('../../ghost-5.96/E00018-4-RC');

    //And lleno el formulario de member
    MembersPage.fillMemberForm(memberData);
    // cy.screenshot('../../ghost-5.96/E00018-5-RC');

    //And doy click en el boton de guardar
    MembersPage.clickSaveButton();
    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00018-6-RC');

    //When verifico que el email es inválido
    MembersPage.getInvalidEmailMessageElement().should(
      "contain.text",
      "Invalid Email."
    );
    // cy.screenshot('../../ghost-5.96/E00018-7-RC');

    //Then verifico que la longitud de la nota es mayor a 500
    MembersPage.getAlertWordCount()
      .should("have.css", "color", "rgb(226, 84, 64)")
      .and(($span) => {
        const charCount = parseInt($span.text().trim());
        expect(charCount).to.be.greaterThan(500);
      });
    // cy.screenshot('../../ghost-5.96/E00018-8-RC');
  });

  it("E00070 - Edit Member - datos a-priori", function () {
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);

    const initialMemberData = membersDataAPriori[3];

    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00019-1-RC');

    //And verifico que estoy en la página de members
    MembersPage.getScreenTitle().should("include.text", "Members");
    // cy.screenshot('../../ghost-5.96/E00019-2-RC');

    //And doy click en el boton de nuevo member
    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00019-3-RC');

    //And lleno el formulario de member
    MembersPage.fillMemberForm(initialMemberData);
    // cy.screenshot('../../ghost-5.96/E00019-4-RC');

    //And doy click en el boton de guardar
    MembersPage.clickSaveButton();
    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00019-5-RC');

    //And voy a la lista de members
    MembersPage.goToMembersList();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00019-6-RC');

    //And doy click en el member por email
    MembersPage.clickMemberByEmail(initialMemberData.email);
    // cy.screenshot('../../ghost-5.96/E00019-7-RC');

    //And borro el nombre y pongo uno nuevo
    const updatedName = membersDataAPriori[4].name;
    MembersPage.clearAndFillMemberName(updatedName);
    // cy.screenshot('../../ghost-5.96/E00019-8-RC');

    //And doy click en el boton de guardar
    MembersPage.clickSaveButton();
    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00019-9-RC');

    //When voy a la lista de members
    MembersPage.goToMembersList();
    // cy.screenshot('../../ghost-5.96/E00019-10-RC');

    //Then verifico que el nombre del member se actualizó
    MembersPage.getMemberNameElement(initialMemberData.email).should(
      "have.text",
      updatedName
    );
    // cy.screenshot('../../ghost-5.96/E00019-11-RC');
  });

  it("E00071 - Edit Member - datos seudo aleatorios Mookaroo", function () {
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);

    const initialMemberData = mockarooData[3];

    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00019-1-RC');

    //And verifico que estoy en la página de members
    MembersPage.getScreenTitle().should("include.text", "Members");
    // cy.screenshot('../../ghost-5.96/E00019-2-RC');

    //And doy click en el boton de nuevo member
    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00019-3-RC');

    //And lleno el formulario de member
    MembersPage.fillMemberForm(initialMemberData);
    // cy.screenshot('../../ghost-5.96/E00019-4-RC');

    //And doy click en el boton de guardar
    MembersPage.clickSaveButton();
    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00019-5-RC');

    //And voy a la lista de members
    MembersPage.goToMembersList();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00019-6-RC');

    //And doy click en el member por email
    MembersPage.clickMemberByEmail(initialMemberData.email);
    // cy.screenshot('../../ghost-5.96/E00019-7-RC');

    //And borro el nombre y pongo uno nuevo
    const updatedName = mockarooData[4].name;
    MembersPage.clearAndFillMemberName(updatedName);
    // cy.screenshot('../../ghost-5.96/E00019-8-RC');

    //And doy click en el boton de guardar
    MembersPage.clickSaveButton();
    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00019-9-RC');

    //When voy a la lista de members
    MembersPage.goToMembersList();
    // cy.screenshot('../../ghost-5.96/E00019-10-RC');

    //Then verifico que el nombre del member se actualizó
    MembersPage.getMemberNameElement(initialMemberData.email).should(
      "have.text",
      updatedName
    );
    // cy.screenshot('../../ghost-5.96/E00019-11-RC');
  });

  it("E00072 - Edit Member - Aleatorio Faker", function () {

    faker.seed(new Date().getTime() / 1000);
    const initialMemberData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.words(20),
    };
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(5000);
    // cy.screenshot('../../ghost-5.96/E00019-1-RC');

    //And verifico que estoy en la página de members
    MembersPage.getScreenTitle().should("include.text", "Members");
    // cy.screenshot('../../ghost-5.96/E00019-2-RC');

    //And doy click en el boton de nuevo member
    MembersPage.clickNewMemberButton();
    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00019-3-RC');

    //And lleno el formulario de member
    MembersPage.fillMemberForm(initialMemberData);
    // cy.screenshot('../../ghost-5.96/E00019-4-RC');

    //And doy click en el boton de guardar
    MembersPage.clickSaveButton();
    cy.wait(4000);
    // cy.screenshot('../../ghost-5.96/E00019-5-RC');

    //And voy a la lista de members
    MembersPage.goToMembersList();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00019-6-RC');

    //And doy click en el member por email
    MembersPage.clickMemberByEmail(initialMemberData.email);
    // cy.screenshot('../../ghost-5.96/E00019-7-RC');

    //And borro el nombre y pongo uno nuevo
    const updatedName = faker.person.fullName();
    MembersPage.clearAndFillMemberName(updatedName);
    // cy.screenshot('../../ghost-5.96/E00019-8-RC');

    //And doy click en el boton de guardar
    MembersPage.clickSaveButton();
    cy.wait(4000);
    // cy.screenshot('../../ghost-5.96/E00019-9-RC');

    //When voy a la lista de members
    MembersPage.goToMembersList();
    // cy.screenshot('../../ghost-5.96/E00019-10-RC');

    //Then verifico que el nombre del member se actualizó
    MembersPage.getMemberNameElement(initialMemberData.email).should(
      "have.text",
      updatedName
    );
    // cy.screenshot('../../ghost-5.96/E00019-11-RC');
  });

  it("E00073 - Delete Member - datos a-priori", function () {

    const memberData = membersDataAPriori[4];
    // cy.screenshot('../../ghost-5.96/E00020-1-RC');
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(5000);
    MembersPage.getScreenTitle().should("include.text", "Members");

    MembersPage.clickNewMemberButton();
    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00020-3-RC');

    //And lleno el formulario de member
    MembersPage.fillMemberForm(memberData);
    // cy.screenshot('../../ghost-5.96/E00020-4-RC');

    //And doy click en el boton de guardar
    MembersPage.clickSaveButton();
    cy.wait(4000);
    // cy.screenshot('../../ghost-5.96/E00020-5-RC');

    //And voy a la lista de members
    MembersPage.goToMembersList();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00020-6-RC');

    //And doy click en el member por email
    MembersPage.clickMemberByEmail(memberData.email);
    // cy.screenshot('../../ghost-5.96/E00020-7-RC');

    //And doy click en el boton de acciones
    MembersPage.openMemberActions();
    // cy.screenshot('../../ghost-5.96/E00020-8-RC');

    //And doy click en el boton de eliminar
    MembersPage.clickDeleteMember();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00020-9-RC');

    //When confirmo que quiero eliminar el member
    MembersPage.confirmDeleteMember();
    // cy.screenshot('../../ghost-5.96/E00020-10-RC');

    //Then verifico que el member ya no existe
    MembersPage.getMembersList().then((membersList) => {
      const member = membersList.find((m) => m.email === memberData.email);
      expect(member).to.be.undefined;
    });
    // cy.screenshot('../../ghost-5.96/E00020-11-RC');

  });

  it("E00074 - Delete Member - datos seudo aleatorios Mookaroo", function () {
    const memberData = mockarooData[4];
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(5000);
    // cy.screenshot('../../ghost-5.96/E00020-1-RC');

    //And verifico que estoy en la página de members
    MembersPage.getScreenTitle().should("include.text", "Members");
    // cy.screenshot('../../ghost-5.96/E00020-2-RC');

    //And doy click en el boton de nuevo member
    MembersPage.clickNewMemberButton();
    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00020-3-RC');

    //And lleno el formulario de member
    MembersPage.fillMemberForm(memberData);
    // cy.screenshot('../../ghost-5.96/E00020-4-RC');

    //And doy click en el boton de guardar
    MembersPage.clickSaveButton();
    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00020-5-RC');

    //And voy a la lista de members
    MembersPage.goToMembersList();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00020-6-RC');

    //And doy click en el member por email
    MembersPage.clickMemberByEmail(memberData.email);
    // cy.screenshot('../../ghost-5.96/E00020-7-RC');

    //And doy click en el boton de acciones
    MembersPage.openMemberActions();
    // cy.screenshot('../../ghost-5.96/E00020-8-RC');

    //And doy click en el boton de eliminar
    MembersPage.clickDeleteMember();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00020-9-RC');

    //When confirmo que quiero eliminar el member
    MembersPage.confirmDeleteMember();
    // cy.screenshot('../../ghost-5.96/E00020-10-RC');

    //Then verifico que el member ya no existe
    MembersPage.getMembersList().then((membersList) => {
      const member = membersList.find((m) => m.email === memberData.email);
      expect(member).to.be.undefined;
    });
    // cy.screenshot('../../ghost-5.96/E00020-11-RC');

  });

  it("E00075 - Delete Member - Aleatorio Faker", function () {
    //Given que voy a la sección de member
    cy.wait(5000);s
    PrincipalPage.visitMembers(BASE_URL);
    faker.seed(new Date().getTime() / 1000);

    const memberData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.words(20),
    };

    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00020-1-RC');

    //And verifico que estoy en la página de members
    MembersPage.getScreenTitle().should("include.text", "Members");
    // cy.screenshot('../../ghost-5.96/E00020-2-RC');

    //And doy click en el boton de nuevo member
    MembersPage.clickNewMemberButton();
    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00020-3-RC');

    //And lleno el formulario de member
    MembersPage.fillMemberForm(memberData);
    // cy.screenshot('../../ghost-5.96/E00020-4-RC');

    //And doy click en el boton de guardar
    MembersPage.clickSaveButton();
    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00020-5-RC');

    //And voy a la lista de members
    MembersPage.goToMembersList();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00020-6-RC');

    //And doy click en el member por email
    MembersPage.clickMemberByEmail(memberData.email);
    // cy.screenshot('../../ghost-5.96/E00020-7-RC');

    //And doy click en el boton de acciones
    MembersPage.openMemberActions();
    // cy.screenshot('../../ghost-5.96/E00020-8-RC');

    //And doy click en el boton de eliminar
    MembersPage.clickDeleteMember();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00020-9-RC');

    //When confirmo que quiero eliminar el member
    MembersPage.confirmDeleteMember();
    // cy.screenshot('../../ghost-5.96/E00020-10-RC');

    //Then verifico que el member ya no existe
    MembersPage.getMembersList().then((membersList) => {
      const member = membersList.find((m) => m.email === memberData.email);
      expect(member).to.be.undefined;
    });
    // cy.screenshot('../../ghost-5.96/E00020-11-RC');

  });

  it("E00076 - Invalid Email Validation Retry - datos a-priori", function () {
    const memberData = membersDataAPriori[5];
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(2000);
    MembersPage.getScreenTitle().should("include.text", "Members");
    // cy.screenshot('../../ghost-5.96/E00017-1-RC');

    // cy.screenshot('../../ghost-5.96/E00017-2-RC');

    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00017-3-RC');

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    // cy.screenshot('../../ghost-5.96/E00017-4-RC');

    //And lleno el formulario de member
    MembersPage.fillMemberForm(memberData);
    // cy.screenshot('../../ghost-5.96/E00017-5-RC');

    MembersPage.clickSaveButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00017-6-RC');

    MembersPage.getInvalidEmailMessageElement().should('contain.text', 'Invalid Email.');
    // cy.screenshot('../../ghost-5.96/E00017-7-RC');

    const memberData2 = membersDataAPriori[6];
    MembersPage.fillMemberForm(memberData);
    MembersPage.getInvalidEmailMessageElement().should('contain.text', '');

  });

  it("E00077 - Invalid Email Validation Retry - datos seudo aleatorios Mookaroo", function () {
    const memberData = mockarooData[5];
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(5000);
    MembersPage.getScreenTitle().should("include.text", "Members");
    // cy.screenshot('../../ghost-5.96/E00017-2-RC');
    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00017-3-RC');

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    // cy.screenshot('../../ghost-5.96/E00017-4-RC');

    MembersPage.fillMemberFormInvalidEmail(memberData);
    // cy.screenshot('../../ghost-5.96/E00017-5-RC');

    MembersPage.clickSaveButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00017-6-RC');

    MembersPage.getInvalidEmailMessageElement().should('contain.text', 'Invalid Email.');
    // cy.screenshot('../../ghost-5.96/E00017-7-RC');

    const memberData2 = mockarooData[6];
    MembersPage.fillMemberForm(memberData);
    MembersPage.getInvalidEmailMessageElement().should('contain.text', '');

  });

  it("E00078 - Invalid Email Validation Retry - datos aleatorios con Faker", function () {

    faker.seed(new Date().getTime() / 1000);

    const memberData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.sentence(),
    };
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(5000);
    MembersPage.getScreenTitle().should("include.text", "Members");
    // cy.screenshot('../../ghost-5.96/E00017-2-RC');

    MembersPage.clickNewMemberButton();

    // cy.screenshot('../../ghost-5.96/E00017-3-RC');

    //And pongo un nuevo member
    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    // cy.screenshot('../../ghost-5.96/E00017-4-RC');

    MembersPage.fillMemberFormInvalidEmail(memberData);
    // cy.screenshot('../../ghost-5.96/E00017-5-RC');

    MembersPage.clickSaveButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00017-6-RC');

    MembersPage.getInvalidEmailMessageElement().should('contain.text', 'Invalid Email.');
    // cy.screenshot('../../ghost-5.96/E00017-7-RC');

    const memberData2 = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.sentence(),
    };

    MembersPage.fillMemberForm(memberData);
    MembersPage.getInvalidEmailMessageElement().should('contain.text', '');

  });

  it("E00079 - Invalid Email Validation Retry Color Red Input - datos a-priori", function () {
    const memberData = membersDataAPriori[7];
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(4000);
    MembersPage.getScreenTitle().should("include.text", "Members");
    // cy.screenshot('../../ghost-5.96/E00017-1-RC');

    // cy.screenshot('../../ghost-5.96/E00017-2-RC');

    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00017-3-RC');

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    // cy.screenshot('../../ghost-5.96/E00017-4-RC');

    //And lleno el formulario de member
    MembersPage.fillMemberForm(memberData);
    // cy.screenshot('../../ghost-5.96/E00017-5-RC');

    MembersPage.clickSaveButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00017-6-RC');

    MembersPage.getInvalidEmailMessageElement().should(
      "contain.text",
      "Invalid Email."
    );
    // cy.screenshot('../../ghost-5.96/E00017-7-RC');

    const memberData2 = membersDataAPriori[8];
    MembersPage.fillMemberForm(memberData2);
    MembersPage.getInvalidEmailMessageElement().should("contain.text", "");

    MembersPage.getColorInputEmail().then((borderColor) => {
      expect(borderColor).to.equal("rgb(245, 11, 35)");
    });
  });

  it("E00080 - Invalid Email Validation Retry Color Red Input - datos seudo aleatorios Mookaroo", function () {
    const memberData = mockarooData[7];
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(4000);
    MembersPage.getScreenTitle().should("include.text", "Members");
    // cy.screenshot('../../ghost-5.96/E00017-1-RC');

    // cy.screenshot('../../ghost-5.96/E00017-2-RC');

    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00017-3-RC');

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    // cy.screenshot('../../ghost-5.96/E00017-4-RC');

    MembersPage.fillMemberFormInvalidEmail(memberData);
    // cy.screenshot('../../ghost-5.96/E00017-5-RC');

    MembersPage.clickSaveButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00017-6-RC');

    MembersPage.getInvalidEmailMessageElement().should(
      "contain.text",
      "Invalid Email."
    );
    // cy.screenshot('../../ghost-5.96/E00017-7-RC');

    const memberData2 = mockarooData[8];
    MembersPage.fillMemberForm(memberData2);
    MembersPage.getInvalidEmailMessageElement().should("contain.text", "");

    MembersPage.getColorInputEmail().then((borderColor) => {
      expect(borderColor).to.equal("rgb(245, 11, 35)");
    });
  });

  it("E00081 - Invalid Email Validation Retry Color Red Input - datos aleatorios con Faker", function () {
    const memberData = {
      name: faker.person.fullName(),
      email: faker.person.fullName(),
      note: faker.lorem.words(20),
    };
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(4000);
    MembersPage.getScreenTitle().should("include.text", "Members");
    // cy.screenshot('../../ghost-5.96/E00017-1-RC');

    // cy.screenshot('../../ghost-5.96/E00017-2-RC');

    MembersPage.clickNewMemberButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00017-3-RC');

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    // cy.screenshot('../../ghost-5.96/E00017-4-RC');

    MembersPage.fillMemberForm(memberData);
    // cy.screenshot('../../ghost-5.96/E00017-5-RC');

    MembersPage.clickSaveButton();
    cy.wait(2000);
    // cy.screenshot('../../ghost-5.96/E00017-6-RC');

    MembersPage.getInvalidEmailMessageElement().should(
      "contain.text",
      "Invalid Email."
    );
    // cy.screenshot('../../ghost-5.96/E00017-7-RC');

    const memberData2 = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.words(20),
    };
    MembersPage.fillMemberForm(memberData2);
    MembersPage.getInvalidEmailMessageElement().should("contain.text", "");

    MembersPage.getColorInputEmail().then((borderColor) => {
      expect(borderColor).to.equal("rgb(245, 11, 35)");
    });
  });

  it("E00082 - Delete Member - datos a-priori", function () {
    const memberData = membersDataAPriori[9];

    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(5000);
    // cy.screenshot("../../ghost-5.96/E00020-1-RC");

    MembersPage.getScreenTitle().should("include.text", "Members");
    // cy.screenshot("../../ghost-5.96/E00020-2-RC");

    MembersPage.clickNewMemberButton();
    cy.wait(3000);
    // cy.screenshot("../../ghost-5.96/E00020-3-RC");

    //And lleno el formulario de member
    MembersPage.fillMemberForm(memberData);
    // cy.screenshot("../../ghost-5.96/E00020-4-RC");

    MembersPage.clickSaveButton();
    cy.wait(3000);
    // cy.screenshot("../../ghost-5.96/E00020-5-RC");

    MembersPage.goToMembersList();
    cy.wait(2000);
    // cy.screenshot("../../ghost-5.96/E00020-6-RC");

    MembersPage.clickMemberByEmail(memberData.email);
    // cy.screenshot("../../ghost-5.96/E00020-7-RC");

    MembersPage.openMemberActions();
    // cy.screenshot("../../ghost-5.96/E00020-8-RC");

    MembersPage.clickDeleteMember();
    cy.wait(2000);
    // cy.screenshot("../../ghost-5.96/E00020-9-RC");

    MembersPage.confirmDeleteMember();
    // cy.screenshot("../../ghost-5.96/E00020-10-RC");
    cy.wait(2000);
    //Then verifico que el member ya no existe
    MembersPage.getMembersList().then((membersList) => {
      const member = membersList.find((m) => m.email === memberData.email);
      expect(member).to.be.undefined;
    });
    // cy.screenshot("../../ghost-5.96/E00020-11-RC");
  });

  it("E00083 - Delete Member - datos seudo aleatorios Mookaroo", function () {
    const memberData = mockarooData[9];

    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(5000);

    // cy.screenshot("../../ghost-5.96/E00020-1-RC");

    MembersPage.getScreenTitle().should("include.text", "Members");
    // cy.screenshot("../../ghost-5.96/E00020-2-RC");

    MembersPage.clickNewMemberButton();
    cy.wait(3000);
    // cy.screenshot("../../ghost-5.96/E00020-3-RC");

    MembersPage.fillMemberForm(memberData);
    // cy.screenshot("../../ghost-5.96/E00020-4-RC");

    MembersPage.clickSaveButton();
    cy.wait(3000);
    // cy.screenshot("../../ghost-5.96/E00020-5-RC");

    MembersPage.goToMembersList();
    cy.wait(2000);
    // cy.screenshot("../../ghost-5.96/E00020-6-RC");

    MembersPage.clickMemberByEmail(memberData.email);
    // cy.screenshot("../../ghost-5.96/E00020-7-RC");

    MembersPage.openMemberActions();
    // cy.screenshot("../../ghost-5.96/E00020-8-RC");

    MembersPage.clickDeleteMember();
    cy.wait(2000);
    // cy.screenshot("../../ghost-5.96/E00020-9-RC");

    MembersPage.confirmDeleteMember();
    // cy.screenshot("../../ghost-5.96/E00020-10-RC");

    MembersPage.getMembersList().then((membersList) => {
      const member = membersList.find((m) => m.email === memberData.email);
      expect(member).to.be.undefined;
    });
    // cy.screenshot("../../ghost-5.96/E00020-11-RC");
  });

  it("E00084 - Delete Member - datos aleatorios con Faker", function () {
    const memberData = {
      name: faker.person.fullName(),
      email: faker.person.fullName(),
      note: faker.lorem.words(20),
    };
    cy.wait(5000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(5000);
    // cy.screenshot("../../ghost-5.96/E00020-1-RC");

    MembersPage.getScreenTitle().should("include.text", "Members");
    // cy.screenshot("../../ghost-5.96/E00020-2-RC");

    MembersPage.clickNewMemberButton();
    cy.wait(3000);
    // cy.screenshot("../../ghost-5.96/E00020-3-RC");

    MembersPage.fillMemberForm(memberData);
    // cy.screenshot("../../ghost-5.96/E00020-4-RC");

    MembersPage.clickSaveButton();
    cy.wait(3000);
    // cy.screenshot("../../ghost-5.96/E00020-5-RC");

    MembersPage.goToMembersList();
    cy.wait(2000);
    // cy.screenshot("../../ghost-5.96/E00020-6-RC");

    MembersPage.clickMemberByEmail(memberData.email);
    // cy.screenshot("../../ghost-5.96/E00020-7-RC");

    MembersPage.openMemberActions();
    // cy.screenshot("../../ghost-5.96/E00020-8-RC");

    MembersPage.clickDeleteMember();
    cy.wait(2000);
    // cy.screenshot("../../ghost-5.96/E00020-9-RC");

    MembersPage.confirmDeleteMember();
    cy.screenshot("../../ghost-5.96/E00020-10-RC");

    MembersPage.getMembersList().then((membersList) => {
      const member = membersList.find((m) => m.email === memberData.email);
      expect(member).to.be.undefined;
    });
    // cy.screenshot("../../ghost-5.96/E00020-11-RC");
  });

  it("E00085 - Buscar Member by email - datos a-priori", function () {
    const memberData = membersDataAPriori[10];
    cy.wait(3000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00016-2-RC');

    MembersPage.clickNewMemberButton();
    cy.wait(3000);
    cy.screenshot("../../ghost-5.96/E00016-3-RC");

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    // cy.screenshot("../../ghost-5.96/E00016-4-RC");

    MembersPage.fillMemberForm(memberData);
    // cy.screenshot("../../ghost-5.96/E00016-5-RC");

    MembersPage.clickSaveButton();
    cy.wait(3000);
    // cy.screenshot("../../ghost-5.96/E00016-6-RC");

    MembersPage.goToMembersList();
    // cy.screenshot("../../ghost-5.96/E00016-7-RC");

    let memberFound = false;
    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });

    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });

    MembersPage.inputSearch(memberData.email);
    cy.wait(3000);
    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });
    // cy.screenshot("../../ghost-5.96/E00016-8-RC");
  });

  it("E00086 - Buscar Member by email - datos seudo aleatorios Mookaroo", function () {
    const memberData = mockarooData[10];
    cy.wait(3000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00016-2-RC');

    MembersPage.clickNewMemberButton();
    cy.wait(3000);
    cy.screenshot("../../ghost-5.96/E00016-3-RC");

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    // cy.screenshot("../../ghost-5.96/E00016-4-RC");

    MembersPage.fillMemberForm(memberData);
    // cy.screenshot("../../ghost-5.96/E00016-5-RC");

    MembersPage.clickSaveButton();
    cy.wait(3000);
    // cy.screenshot("../../ghost-5.96/E00016-6-RC");

    MembersPage.goToMembersList();
    // cy.screenshot("../../ghost-5.96/E00016-7-RC");

    let memberFound = false;
    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });

    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });

    MembersPage.inputSearch(memberData.email);
    cy.wait(3000);
    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });
    // cy.screenshot("../../ghost-5.96/E00016-8-RC");
  });

  it("E00087 - Buscar Member by email - datos aleatorios con Faker", function () {
    const memberData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.words(20),
    };
    cy.wait(3000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00016-2-RC');

    MembersPage.clickNewMemberButton();
    cy.wait(3000);
    cy.screenshot("../../ghost-5.96/E00016-3-RC");

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    // cy.screenshot("../../ghost-5.96/E00016-4-RC");

    MembersPage.fillMemberForm(memberData);
    // cy.screenshot("../../ghost-5.96/E00016-5-RC");

    MembersPage.clickSaveButton();
    cy.wait(3000);
    // cy.screenshot("../../ghost-5.96/E00016-6-RC");

    MembersPage.goToMembersList();
    // cy.screenshot("../../ghost-5.96/E00016-7-RC");
    cy.wait(3000);
    let memberFound = false;
    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });

    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });

    MembersPage.inputSearch(memberData.email);
    cy.wait(3000);
    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });
    // cy.screenshot("../../ghost-5.96/E00016-8-RC");
  });

  it("E00088 - Buscar Member by Name - datos a-priori", function () {
    const memberData = membersDataAPriori[11];
    cy.wait(3000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00016-2-RC');

    MembersPage.clickNewMemberButton();
    cy.wait(3000);
    cy.screenshot("../../ghost-5.96/E00016-3-RC");

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    // cy.screenshot("../../ghost-5.96/E00016-4-RC");

    MembersPage.fillMemberForm(memberData);
    // cy.screenshot("../../ghost-5.96/E00016-5-RC");

    MembersPage.clickSaveButton();
    cy.wait(3000);
    // cy.screenshot("../../ghost-5.96/E00016-6-RC");

    MembersPage.goToMembersList();
    // cy.screenshot("../../ghost-5.96/E00016-7-RC");

    let memberFound = false;
    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });

    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });

    MembersPage.inputSearch(memberData.email);
    cy.wait(3000);
    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });
    // cy.screenshot("../../ghost-5.96/E00016-8-RC");
  });

  it("E00089 - Buscar Member by Name - datos seudo aleatorios Mookaroo", function () {
    const memberData = mockarooData[11];
    cy.wait(3000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00016-2-RC');

    MembersPage.clickNewMemberButton();
    cy.wait(3000);
    cy.screenshot("../../ghost-5.96/E00016-3-RC");

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    // cy.screenshot("../../ghost-5.96/E00016-4-RC");

    MembersPage.fillMemberForm(memberData);
    // cy.screenshot("../../ghost-5.96/E00016-5-RC");

    MembersPage.clickSaveButton();
    cy.wait(3000);
    // cy.screenshot("../../ghost-5.96/E00016-6-RC");

    MembersPage.goToMembersList();
    // cy.screenshot("../../ghost-5.96/E00016-7-RC");

    let memberFound = false;
    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });

    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });

    MembersPage.inputSearch(memberData.name);
    cy.wait(3000);
    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });
    // cy.screenshot("../../ghost-5.96/E00016-8-RC");
  });

  it("E00090 - Buscar Member by Name - datos aleatorios con Faker", function () {

    const memberData = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.words(20),
    };

    cy.wait(3000);
    PrincipalPage.visitMembers(BASE_URL);
    cy.wait(3000);
    // cy.screenshot('../../ghost-5.96/E00016-2-RC');

    MembersPage.clickNewMemberButton();
    cy.wait(3000);
    cy.screenshot("../../ghost-5.96/E00016-3-RC");

    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });
    // cy.screenshot("../../ghost-5.96/E00016-4-RC");

    MembersPage.fillMemberForm(memberData);
    // cy.screenshot("../../ghost-5.96/E00016-5-RC");

    MembersPage.clickSaveButton();
    cy.wait(3000);
    // cy.screenshot("../../ghost-5.96/E00016-6-RC");

    MembersPage.goToMembersList();
    // cy.screenshot("../../ghost-5.96/E00016-7-RC");

    let memberFound = false;
    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });

    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });

    MembersPage.inputSearch(memberData.name);
    cy.wait(3000);
    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });
    // cy.screenshot("../../ghost-5.96/E00016-8-RC");
  });
});
