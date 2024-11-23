import { LogIn } from "./logIn";
const BASE_URL = "http://localhost:2368";

export const CONTENT = {
  newPageButton: 'a[data-test-new-page-button=""]',
  pageTitleInput: 'textarea[data-test-editor-title-input=""]',
  pageContentInput: 'p[data-koenig-dnd-droppable="true"]',
  publishPageButton: 'button[data-test-button="publish-flow"]',
  newPageModal: "div.epm-modal-container",
  continueCreationPageButton: 'button[data-test-button="continue"]',
  confirmCreationPageButton: 'span[data-test-task-button-state="idle"]',
  editPageButton: "span.gh-post-list-cta.edit",
  updatePageButton: "button.gh-btn-editor",
  goToPagesButton: 'a[data-test-link="pages"]',
  unpublishPageButton: 'button[data-test-button="update-flow"]',
};

export class PagesPage {
  static doLogIn() {
    cy.fixture("properties.json").then((data) => {
      cy.visit(data.baseURL); // Go to log In URL
      LogIn.logIn(data.email, data.password); // Enter credentials
      LogIn.logInButton(); // Click on LogIn
    });
  }

  static createPage(title, content) {
    cy.fixture("properties.json").then((data) => {
      cy.visit(data.adminBaseURL + "/#/editor/page"); // Go to log In URL

      cy.get(CONTENT.pageTitleInput).type(title);
      cy.get(CONTENT.pageContentInput).first().type(content);

      cy.wait(200);
      cy.get(CONTENT.publishPageButton).first().click();

      cy.get(CONTENT.newPageModal).within(() => {
        cy.get(CONTENT.continueCreationPageButton).first().click(); // click en continuar
        cy.get(CONTENT.confirmCreationPageButton).first().click(); //click en confirmar
      });

      cy.wait(200);
      cy.get("div.modal-content").within(() => {
        cy.get('button[title="Close"]').first().click();
      });

      cy.visit(data.adminBaseURL + "/#/dashboard"); // Go to log In URL
    });
  }

  static deletePageByTitle(title) {
    cy.fixture("properties.json").then((data) => {
      cy.visit(data.adminBaseURL + "/#/pages");
      cy.wait(500);

      cy.get("div.posts-list").within(() => {
        cy.contains(title)
          .rightclick({ force: true });
      });

      cy.wait(100);
      cy.get('button[data-test-button="delete"]')
        .first()
        .click({ force: true });

      cy.get('button[data-test-button="confirm"]').first().click();
    });
  }

  static closeModal() {
    cy.get("div.modal-content").within(() => {
      cy.get('button[title="Close"]').first().click();
    });
  }

  static addContentToPage(title, content) {
    cy.get(CONTENT.pageTitleInput).type(title);
    cy.get(CONTENT.pageContentInput).first().type(content);
  }

  static clearPageTitle() {
    cy.get(CONTENT.pageTitleInput).first().clear();
  }

  static clickConfirmCreatePage() {
    cy.get(CONTENT.newPageModal).within(() => {
      cy.get(CONTENT.continueCreationPageButton).first().click(); // click en continuar
      cy.get(CONTENT.confirmCreationPageButton).first().click(); //click en confirmar
    });
  }

  static getLateralMenuInPage() {
    return cy.get("button.settings-menu-toggle").first();
  }

  static getDeletePageButton() {
    return cy.get('button[data-test-button="delete-post"]').first();
  }

  static getConfirmDeleteModal() {
    return cy.get(CONTENT.newPageModal);
  }

  static clickOnDeletePage() {
    return cy
      .get('button[data-test-button="delete-post-confirm"]')
      .contains("Delete")
      .click();
  }

  static getPublishPageModal() {
    return cy.get('div[data-test-publish-flow="complete"]');
  }

  static getUpdatePageNotification() {
    return cy.get("aside.gh-notifications");
  }

  static getPageStatus() {
    return cy.get('div[data-test-editor-post-status=""]');
  }

  static getUnPublishPageButton() {
    return cy.get(CONTENT.unpublishPageButton);
  }

  static getRevertToDraftPageButton() {
    return cy.get('button[data-test-button="revert-to-draft"]').first();
  }

  static getEditFirstPageButton() {
    return cy.get(CONTENT.editPageButton).first();
  }

  static getEditPageButtonByTitle(title) {
    return cy.contains(title).parent().within(() => {
      cy.get(CONTENT.editPageButton).first().click();
      
    })
  }

  static getPageVerificationFailedComponent() {
    return cy.get("div.gh-alert-content");
  }

  static getListOfPages() {
    return cy.get('ol.gh-list');
}

static getListPages() {
    return cy.get("div.posts-list");
  }

  static getPageTitleInConfirmationModal() {
    return cy.get('h2');
  }
  
  static getModal() {
    return cy.get("div.modal-content");
  }

  static getSearchTagInput() {
    return cy.get('input[type="search"]')
  }

  static getButtonOnRigthClickMenu(role) {
    return cy.get('button[data-test-button="'+role+'"')
  }

  static buttonAddTagToPage() {
    return cy.get('button[data-test-button="confirm"]')
  }
  
  static getListOfTagsAvailableForPage() {
    return cy.get('ul[role="listbox"]')
  }

  static doRightClickPageItem(pageTitle) {
    return cy
    .contains(pageTitle)
    .first()
    .rightclick({ force: true });
  }

  static goToPages() {
    cy.fixture("properties.json").then((data) => {
      cy.visit(data.adminBaseURL + "/#/pages"); // Go to Pages
    });
  }
}
