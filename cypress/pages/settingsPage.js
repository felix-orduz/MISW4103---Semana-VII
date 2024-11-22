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

  static editDesc(descEditado) {
    return cy.get('[placeholder="Site description"]').clear().type(descEditado);
  }

  static saveChangesTitle() {
    cy.get('[data-testid="title-and-description"]')
      .find("span")
      .contains("Save")
      .click({ force: true });
  }

  static validateTitle(titleEditado) {
    cy.get('[data-testid="title-and-description"]')
      .find('h6')
      .contains('Site title')
      .parent()
      .find('.flex.items-center.mt-1')
      .should("have.text", titleEditado);
  }

  static validateDesc(descEditado) {
    cy.get('[data-testid="title-and-description"]')
      .find('h6')
      .contains('Site description')
      .parent()
      .find('.flex.items-center.mt-1')
      .should("have.text", descEditado);
  }
  
  static clickTitleLang() {
    return cy.get("#publication-language").first().click({ force: true });
  }

  static clickEditLang() {
    cy.get('[data-testid="publication-language"]')
      .find("span")
      .contains("Edit")
      .click({ force: true });
  }

  static editLang(langEditado) {
    return cy.get('[placeholder="Site language"]').clear().type(langEditado);
  }

  static saveChangesLang() {
    cy.get('[data-testid="publication-language"]')
      .find("span")
      .contains("Save")
      .click({ force: true });
  }

  static validateLanguage(langEditado) {
    cy.get('[data-testid="publication-language"]')
      .find(".flex.items-center.mt-1")
      .should("have.text", langEditado);
  }

  static generateSpecialCara() {
    let specialChars = ["@", "#", "$", "%", "&", "*", "!"];
    let randomChar = faker.helpers.arrayElement(specialChars);
    return randomChar;
  }
}
