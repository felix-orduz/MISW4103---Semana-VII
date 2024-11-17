import { LogIn } from "./logIn";

export const CONTENT = {
    newPageButton: 'a[href="#/editor/page/"]',
    pageTitleInput: 'textarea.gh-editor-title[placeholder="Page title"]',
    pageContentInput: 'p[data-koenig-dnd-droppable="true"]',
    publishPageButtonDropd: 'div.gh-publishmenu-trigger[role="button"]',
    publishPageButton: 'button.gh-publishmenu-button',
    newPageModal: 'div.epm-modal-container',
    continueCreationPageButton: 'button[data-test-button="continue"]',
    confirmCreationPageButton: 'span[data-test-task-button-state="idle"]',
    editPageButton: 'span.gh-post-list-cta.edit',
    updatePageButton: 'div.gh-btn.gh-btn-editor',
    goToPagesButton: 'a[data-test-link="pages"]',
    unpublishPageButton: 'button[data-test-button="update-flow"]',
}

export class PagesPage {
    static doLogIn() {
        cy.fixture('properties.json').then((data) => {
            cy.visit(data.baseURL); // Go to log In URL
            LogIn.logIn(data.email, data.password); // Enter credentials
            LogIn.logInButton(); // Click on LogIn 
        });
    }

    static createPage(title, content) {
        cy.fixture('properties.json').then((data) => {
            cy.visit(data.adminBaseURL + "/#/editor/page"); // Go to log In URL

            cy.get(CONTENT.pageTitleInput).type(title);
            cy.get(CONTENT.pageContentInput).first().type(content);

            cy.wait(100);
            cy.get(CONTENT.publishPageButtonDropd).first().click(); 
            cy.get(CONTENT.publishPageButton).first().click(); 
            cy.wait(100);
        });

    }

    static deletePageByTitle(title) {
        cy.fixture('properties.json').then((data) => {
            cy.visit(data.adminBaseURL + "/#/pages"); // Go to Pages

            cy.get('section.view-container.content-list').within(() => {
                cy.get('h3.gh-content-entry-title')
                    .first()
                    .should('contain', title)
                    .click({ force: true });
            });

            cy.wait(100);

            cy.get('button.settings-menu-toggle[title="Settings"]').first().click();
            cy.get('button.settings-menu-delete-button[type="button"]').first().click();

            cy.get('div.modal-content').within(() => {
                cy.get('button.gh-btn.gh-btn-red').first().click();
            });

            cy.wait(100);
        });
    }

    static addContentToPage(title, content) {
        cy.get(CONTENT.pageTitleInput).type(title)
        cy.get(CONTENT.pageContentInput).first().type(content)
    }

    static clickConfirmCreatePage() {
        cy.get(CONTENT.newPageModal).within(() => {
            cy.get(CONTENT.continueCreationPageButton).first().click() // click en continuar
            cy.get(CONTENT.confirmCreationPageButton).first().click(); //click en confirmar
        })
    }

    static getLateralMenuInPage() {
        return cy.get('button.settings-menu-toggle').first();
    }

    static getDeletePageButton() {
        return cy.get('button[data-test-button="delete-post"]').first();
    }

    static getConfirmDeleteModal() {
        return cy.get(CONTENT.newPageModal);
    }

    static clickOnDeletePage() {
        return cy.get('button[data-test-button="delete-post-confirm"]').contains('Delete').click();
    }

    static getPublishPageModal() {
        return cy.get('div[data-test-publish-flow="complete"]');
    }

    static getListOfPages() {
        return cy.get('ol.gh-list');
    }

    static doClickOnUpdatePageButton() {
         cy.get(CONTENT.updatePageButton).first().click();
         cy.get('button.gh-publishmenu-button').first().click();
    }

    static getUpdatePageNotification() {
        return cy.get('aside.gh-notifications');
    }

    static goToPages() {
        cy.fixture('properties.json').then((data) => {
            cy.visit(data.adminBaseURL + "/#/pages"); // Go to Pages
        });
    }
}