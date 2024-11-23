export class MembersPage {
  // Obtiene el título de la pantalla de la página actual
  static getScreenTitle() {
    return cy.get("h2.gh-canvas-title[data-test-screen-title]");
  }

  // Hace clic en el botón para agregar un nuevo miembro en la página de miembros
  static clickNewMemberButton() {
    return cy.get('a[data-test-new-member-button="true"]').click();
  }

  // Llena el formulario de nuevo miembro con los datos proporcionados: nombre, email y nota
  static fillMemberForm({ name, email, note }) {
    cy.get('input[data-test-input="member-name"]').clear().type(name); // Ingresa el nombre
    cy.get('input[data-test-input="member-email"]').clear().type(email); // Ingresa el correo electrónico
    cy.get('textarea[data-test-input="member-note"]').clear().type(note); // Ingresa una nota
  }

  static fillMemberFormInvalidEmail({ name, email, note }) {
    cy.get('input[data-test-input="member-name"]').clear().type(name);
    cy.get('input[data-test-input="member-email"]').clear().type(name);
    cy.get('textarea[data-test-input="member-note"]').clear().type(note); // Ingresa una nota
  }

  static fillMemberFormInvalidEmailAndNote({ name, email, note }) {
    cy.get('input[data-test-input="member-name"]').clear().type(name);
    cy.get('input[data-test-input="member-email"]').clear().type(name);
    // cy.get('textarea[data-test-input="member-note"]').clear().type(note.repeat(2)); // Ingresa una nota
    cy.get('textarea[data-test-input="member-note"]').clear().then(() => {
      const baseText = note;
      const targetLength = 501;
      let resultText = baseText.repeat(Math.floor(targetLength / baseText.length));
      resultText += baseText.slice(0, targetLength - resultText.length);

      cy.get('textarea[data-test-input="member-note"]').type(resultText);
    });
  }

  // Hace clic en el botón para guardar el miembro nuevo
  static clickSaveButton() {
    return cy.get('button[data-test-button="save"]').click();
  }

  // Navega de regreso a la lista de miembros haciendo clic en el botón correspondiente
  static goToMembersList() {
    return cy.get('a[data-test-link="members-back"]').click();
  }

  // Obtiene y retorna una lista de objetos con los nombres y correos electrónicos de los miembros
  static getMembersList() {
    return cy.get("table tbody tr").then(($rows) => {
      return Array.from($rows, (row) => {
        const name = Cypress.$(row)
          .find("h3.gh-members-list-name")
          .text()
          .trim(); // Obtiene y limpia el nombre del miembro
        const email = Cypress.$(row)
          .find("p.gh-members-list-email")
          .text()
          .trim(); // Obtiene y limpia el correo electrónico del miembro
        return { name, email }; // Retorna un objeto con el nombre y correo del miembro
      });
    });
  }

  static getInvalidEmailMessageElement() {
    return cy.get("input#member-email + p.response");
  }

  static clickMemberByEmail(email) {
    return cy.contains("p.gh-members-list-email", email).click({force: true});
  }

  static openMemberActions() {
    return cy.get('button[data-test-button="member-actions"]').click();
  }

  static clickDeleteMember() {
    return cy.get('button[data-test-button="delete-member"]').click();
  }

  static confirmDeleteMember() {
    return cy.get('button[data-test-button="confirm"]').click();
  }

  static getAlertWordCount() {
    return cy.get('span.word-count');
  }

  static clearAndFillMemberName(name) {
    cy.get('input[data-test-input="member-name"]').clear().type(name);
  }

  static getMemberNameElement(email) {
    return cy.contains("p.gh-members-list-email", email)
      .parent()
      .find("h3.gh-members-list-name");
  }

  static getColorInputEmail(email) {
    return cy.get('input[data-test-input="member-email"]').invoke('css', 'border-color');
  }

  static inputSearch(text) {
    cy.get('input[data-test-input="members-search"]').clear().type(text);
  }

}
