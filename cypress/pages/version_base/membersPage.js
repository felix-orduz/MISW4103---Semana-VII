export class MembersPage {

  static getScreenTitle() {
    return cy.get("h2.gh-canvas-title");
  }

  static clickNewMemberButton() {
    return cy.get('a.gh-btn.gh-btn-primary').contains('New member').click();
  }

  static fillMemberForm({ name, email, note }) {
    cy.get('input#member-name').clear({ force: true }).type(name, { force: true });
    cy.get('input#member-email').clear({ force: true }).type(email, { force: true });
    cy.get('textarea#member-note').clear({ force: true }).type(note, { force: true });
  }

  static clickSaveButton() {
    return cy.get('button.gh-btn.gh-btn-primary.gh-btn-icon')
      .contains('Save')
      .scrollIntoView()
      .should('be.visible')
      .click();
  }

  static goToMembersList() {
    return cy.contains('a', 'Members')
      .scrollIntoView()
      .should('be.visible')
      .click();
  }

  static getMembersList() {
    return cy.get("ol.members-list li.gh-members-list-item").then(($items) => {

      return Array.from($items, (item) => {
        const name = Cypress.$(item)
          .find("h3.gh-members-list-name")
          .text()
          .trim();
        const email = Cypress.$(item)
          .find("p.gh-members-list-email")
          .text()
          .trim();
        return { name, email };
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

  static clickDeleteMember() {
    cy.get('button.gh-btn.gh-btn-red.gh-btn-icon')
      .contains('Delete member')
      .scrollIntoView()
      .should('be.visible')
      .click();
  }

  static confirmDeleteMember() {
    return cy.get('section.modal-content')
      .find('button.gh-btn.gh-btn-red.gh-btn-icon')
      .contains('Delete member')
      .scrollIntoView()
      .should('be.visible')
      .click();
  }

  static getAlertWordCount() {
    return cy.get('span.word-count');
  }

  static clearAndFillMemberName(name) {
    cy.get('input#member-name').should('be.visible').clear({ force: true }).type(name, { force: true });
  }

  static getMemberNameElement(email) {
    return cy.contains("p.gh-members-list-email", email)
      .parent()
      .find("h3.gh-members-list-name");
  }

}
