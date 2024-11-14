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
      //Given que estoy en la pagina del login del Admin
      cy.visit('http://localhost:2368/ghost/#/signin');

      //When inicio sesión con mis credenciales
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
    });
  });

  it("E00016 - Crear Member", function () {
    // When Navegar a la sección de miembros desde la página principal
    PrincipalPage.visitMembers(BASE_URL);

    // Generar datos ficticios para el nuevo miembro utilizando Faker
    const memberData = {
      name: faker.name.fullName(),
      email: faker.internet.email(),
      note: faker.lorem.sentence(),
    };

    cy.wait(2000); // Esperar a que la página de miembros cargue completamente

    // Then Verificar que el administrador esté en la página de listado de miembros
    MembersPage.getScreenTitle().should("include.text", "Members");

    // Then Hacer clic en el botón para agregar un nuevo miembro
    MembersPage.clickNewMemberButton();
    cy.wait(2000); // Esperar a que cargue la página de creación de miembro

    // Then Verificar que el título de la página indique "New member"
    MembersPage.getScreenTitle()
      .invoke("text")
      .then((text) => {
        const normalizedText = text.trim().replace(/\s+/g, " ");
        expect(normalizedText).to.include("New member");
      });

    // Then Llenar el formulario con los datos del nuevo miembro
    MembersPage.fillMemberForm(memberData);

    // Then Hacer clic en el botón para guardar el nuevo miembro
    MembersPage.clickSaveButton();

    // Then Volver a la lista de miembros después de guardar el nuevo miembro
    MembersPage.goToMembersList();

    // Then Verificar que el nuevo miembro esté en la lista de miembros usando su correo electrónico
    let memberFound = false;
    MembersPage.getMembersList().then((membersList) => {
      const emails = membersList.map((member) => member.email);
      expect(emails).to.include(memberData.email);
    });
  });
});
