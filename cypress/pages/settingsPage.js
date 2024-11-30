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
      .find("h6")
      .contains("Site title")
      .parent()
      .find(".flex.items-center.mt-1")
      .should("have.text", titleEditado);
  }

  static validateDesc(descEditado) {
    cy.get('[data-testid="title-and-description"]')
      .find("h6")
      .contains("Site description")
      .parent()
      .find(".flex.items-center.mt-1")
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

  static clickSocial() {
    return cy.get("#social-accounts").first().click({ force: true });
  }

  static clickEditSocial() {
    cy.get('[data-testid="social-accounts"]')
      .find("span")
      .contains("Edit")
      .click({ force: true });
  }

  static editSocial(socialEditado) {
    return cy
      .get('[placeholder="https://x.com/ghost"]')
      .clear()
      .type(socialEditado);
  }

  static cancelChangesSocial() {
    cy.get('[data-testid="social-accounts"]')
      .find("span")
      .contains("Cancel")
      .click({ force: true });
  }

  static validateSocial(socialEditado) {
    cy.get('[data-testid="social-accounts"]')
      .find(".flex.items-center.mt-1")
      .eq(1)
      .should("have.text", socialEditado);
  }

  static clickAnalytics() {
    return cy.get("#analytics").first().click({ force: true });
  }

  static disableAnalyticsButton(selector) {
    cy.get(selector)
      .should('have.attr', 'aria-checked', 'true') // Verifica que esté habilitado
      .click(); // Hacemos clic para deshabilitarlo
  }
  
  static clickSaveChangesAnalytics() {
    // Guardamos los cambios
    cy.get('[data-testid="analytics"]')
      .find("span")
      .contains("Save")
      .click({ force: true });
  }

  static validateAnalyticsButton(buttonSelector, check, status) {
    // Encuentra el botón por su selector
    cy.get(buttonSelector) // Usamos el selector pasado como parámetro
      .should("have.attr", check, status); // Verificamos que esté habilitado o deshabilitado
  }

  static clickIntegrations() {
    return cy.get("#integrations").first().click({ force: true });
  }
}
