export class Settings {
  static clickTitleDescr() {
    return cy.get("#general").first().click({ force: true });
  }

  static clickEditTitle() {
    cy.get('[data-testid="title-and-description"]')
      .find("span")
      .contains("Edit")
      .click({ force: true });
  }

  static editTitle(titleEditado) {
    return cy.get('[placeholder="Site title"]').clear().type(titleEditado);
  }

  static saveChangesTitle() {
    cy.get('[data-testid="title-and-description"]')
      .find("span")
      .contains("Save")
      .click({ force: true });
  }
}
