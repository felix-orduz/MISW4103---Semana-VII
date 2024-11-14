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

  it("E0018 - Validación de Email Inválido y Longitud de Nota", function () {
    // When Navegar a la sección de miembros y abrir el formulario para crear un nuevo miembro
    PrincipalPage.visitMembers(BASE_URL);
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

    // Then Generar texto de más de 500 caracteres para el campo de nota
    const longNote = faker.lorem.words(100); // Genera un texto largo que excede los 500 caracteres

    // Then Generar un nombre y nota válidos, pero un email inválido
    const memberData = {
      name: faker.name.fullName(),
      email: "invalid-email-format", // Email inválido
      note: longNote,
    };

    // Then Llenar el formulario con el email inválido
    MembersPage.fillMemberForm(memberData);

    // Then Hacer clic en el botón para guardar el nuevo miembro
    MembersPage.clickSaveButton();

    // Then Verificar que se muestre el mensaje de error "Invalid Email."
    MembersPage.getInvalidEmailMessageElement().should(
      "contain.text",
      "Invalid Email."
    );
    // Verificar que no se haya hecho ninguna solicitud POST ni PUT

    // Then Verificar que el contador de caracteres indique que se ha excedido el límite y esté en rojo
    cy.get("span.word-count")
      .should("have.css", "color", "rgb(226, 84, 64)") // Color rojo
      .and(($span) => {
        const charCount = parseInt($span.text().trim());
        expect(charCount).to.be.greaterThan(500);
      });
  });
});
