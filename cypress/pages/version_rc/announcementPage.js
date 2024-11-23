import { LogIn } from "./logIn";

export class AnnouncementPage {
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

    static goToEditAnnouncement() {
        cy.fixture("properties.json").then((data) => {
          cy.visit(data.adminBaseURL + "/#/settings/announcement-bar"); 
        });
    }

    static getAnnouncementInput() {
        return cy.contains('Announcement').get('span[data-lexical-text="true"]');
    }

    static getBackgroundColorButton(color) {
        return cy.contains('Background color')
        .get(`button[title="${color}"]`)
    }

    static getVisibilityCheckbox(vis) {
        return cy.contains('Visibility')
        .get(`button[value="${vis}"]`)
    }

    static clickCustomizeAnnouncement() {
        return cy.get('button.cursor-pointer.text-grey-900').click();
    }

    static getAnnouncementSection() {
        return cy.get('div[data-testid="announcement-bar"]');
    }

  
}