export class IntegrationsPage {
    // Función para validar que la sección "Advanced" se está viendo
    static validateAdvancedSection() {
      cy.contains("h2", "Advanced").should("be.visible");
    }
    static clickAddCustomIntegration() {
      // Localiza el botón por su texto y realiza el clic
      cy.contains("button", "Add custom integration").click({ force: true });
    }
  
    // Función para hacer clic en el campo de titulo y agregar un titulo
    static addCustomIntegrationTitle(title) {
      cy.get('[placeholder="Custom integration"]').clear().type(title);
    }
    // Función para hacer clic en el botón "Add"
    static clickAddButton() {
      cy.get('[data-testid="add-integration-modal"]')
        .contains("button", "Add")
        .click({ force: true });
    }
    
    // Función para hacer clic en el tab Custom
    static clickTabCustumButton() {
    cy.get('button#custom').click(); 
  };
  
    // Función para validar el título
    static validateTitle(expectedTitle) {
      cy.get('[name=":r18:"]') // Usamos el ID escapado del campo Title
        .should("have.value", expectedTitle);
    }
  
    // Función para agregar una descripción
    static addDescription(description) {
      cy.get('[name=":r1a:"]') // Usamos el ID escapado del campo Description
        .click()
        .type(description);
    }
  
    // Función para hacer clic en el botón "Save"
    static clickSaveButton() {
      cy.get('[data-testid="custom-integration-modal"]')
        .contains("button", "Save")
        .click({ force: true });
    }
  
    // Función para hacer clic en el botón "Close"
    static clickCloseButton() {
      cy.get('[data-testid="custom-integration-modal"]')
        .contains("button", "Close")
        .click({ force: true });
    }
  
    // Función para validar que el título se encuentre en el listado
    static validateTitleInList(title) {
      cy.get('[data-testid="integrations"]').contains(title).should("exist");
    }
  
    // Función para hacer clic el registro creado
    static clicIntegration(title) {
      cy.get('[data-testid="integrations"]')
        .contains(title)
        .click({ force: true });
    }
  
    // Función para hacer clic en el titulo creado
    static clicIntegrationTitle() {
      cy.get('[name=":r1d:"]').click({ force: true });
    }
  
    // Función para editar un titulo ya creado
    static editCustomIntegrationTitle(title) {
      cy.get('[name=":r1d:"]').clear().type(title);
    }
  
    // Función para editar una descripción
    static editCustomIntegrationDescription(description) {
      cy.get('[name=":r1f:"]') // Usamos el ID escapado del campo Description
        .click()
        .type(description);
    }
  
    // Función para eliminar el registro creado
    static deleteIntegration(title) {
      cy.get('[data-testid="integrations"]')
        .contains(title.Trim())
        .parent()
        .parent()
        .trigger("mouseover") // Simulamos el evento de pasar el ratón por encima
        .find("button")
        .contains("Delete")
        .click({ force: true });
    }
    // Función para confirmar la eliminación de la integración
    static confirmDeleteIntegration() {
      // Localiza el botón por su texto y realiza el clic
      cy.contains("button", "Delete Integration").click({ force: true });
    }
  
    // Función para validar que el registro ha sido eliminado
    static validateIntegrationDeleted(title) {
      cy.get('[data-testid="integrations"]').contains(title).should("not.exist");
    }
  }
  