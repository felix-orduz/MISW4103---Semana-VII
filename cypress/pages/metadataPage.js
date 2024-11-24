import { LogIn } from "./logIn";

export class MetadataPage {
    static doLogIn() {
      cy.fixture("properties.json").then((data) => {
        cy.visit(data.baseURL); // Go to log In URL
        LogIn.logIn(data.email, data.password); // Enter credentials
        LogIn.logInButton(); // Click on LogIn
      });
    }

    static goToSettings() {
        cy.fixture("properties.json").then((data) => {
            cy.visit(data.adminBaseURL + "/#/dashboard"); // Go to Dashboard
            cy.get('a[data-test-nav="settings"]').click();
        });
    }

    static goToEditMetadata() {
        cy.fixture("properties.json").then((data) => {
          cy.visit(data.adminBaseURL + "/#/settings/metadata"); 
        });
    }

    static getMetadataSection() {
        return cy.get('div[data-testid="metadata"]');
    }

    static getSaveMetadataButton() {
        return cy.get('button.cursor-pointer.bg-green');
    }

    static getMetadataPreview() {
        return  cy.get('span.text-lg');
    }
}