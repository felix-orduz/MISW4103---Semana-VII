import { LogIn } from "./logIn";

export class DesingPage {
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

    static goToEditDesign() {
        cy.fixture("properties.json").then((data) => {
          cy.visit(data.adminBaseURL + "/#/settings/design/edit"); 
        });
    }

    static goToSite() {
        cy.fixture("properties.json").then((data) => {
          cy.visit(data.siteURL + "/"); 
        });
    }

    static getSiteDescriptionInput() {
        return cy.get('input.peer.order-2.h-9.w-full.bg-transparent[type="text"]');
    }

    static getAccentColorInput() {
        return cy.get('input[aria-label="Color value"]');
    }

    static getSaveDesignButton() {
        return cy.contains('Save').get('button.cursor-pointer.bg-black.text-white');
    }

    static getSiteFooter() {
      return cy.get('footer.gh-footer.gh-outer');
    }

    static getSubheaderInFooter() {
      return cy.get('p.gh-footer-signup-subhead.is-body');
    }
}