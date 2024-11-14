export class PostPage {
    static getTitleSection() {
        return cy.get('a.active.ember-view').should('be.visible');
    }

    static clickNewPost() {
        return cy.get('[href="#/editor/post/"]').first().click({ force: true });
    }

    static writeTitle(title) {
        return cy.get('.gh-editor-title.ember-text-area.gh-input.ember-view').clear().type(title);
    }

    static clickInContent() {
        return cy.get('p[data-koenig-dnd-droppable="true"]').first().click({ force: true });
    }

    static clickInTitle() {
        return cy.get('.gh-editor-title.ember-text-area.gh-input.ember-view').click({ force: true });
    }

    static writeContent(content) {
        return cy.get('p[data-koenig-dnd-droppable="true"]').first().type(content, {force: true});
    }

    static clearContent() {
        return cy.get('p[data-koenig-dnd-droppable="true"]').first().clear();
    }

    static creationPostPage() {
        return cy.get('.gh-editor-title.ember-text-area.gh-input.ember-view').should('be.visible');
    }

    static publishPostButton() {
        return cy.get('.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-editor.gh-publishmenu-trigger').first().click({ force: true });
    }

    static continueButton() {
        return cy.get('[data-test-button="continue"]').first().click({ force: true });
    }

    static publishPostButtonFinal() {
        return cy.get('.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view').first().click({ force: true });
    }

    static closePublishModal() {
        return cy.get('[data-test-button="close-publish-flow"]').first().click({ force: true});
    }

    static lastPostCreated(title, flag) {
        // Verifica si existe algún elemento en la lista de posts
        cy.get('body').then(($body) => {
            if ($body.find('ol.posts-lit.gh-list').length) {
                // Si existe, selecciona el primer elemento en la lista
                cy.get('li.gh-list-row.gh-posts-list-item').first().within(() => {
                    // Encuentra el post por data-test-post-id y guarda su ID
                    if(flag === 'notClick') {
                        cy.get('a').first().then(() => {
                            cy.get('h3.gh-content-entry-title').first().should('include.text', title);
                        });
                    }

                    else if(flag === 'click') {
                        cy.get('a').first().then(() => {
                            cy.get('h3.gh-content-entry-title').first().click({ force: true });
                        });
                    }

                    else {
                        cy.get('h3.gh-content-entry-title').first().rightclick({ force: true });
                    }
                });
            }
        });
    }

    static updatePostButton() {
        return cy.get('[data-test-button="publish-save"]').first().click({ force: true });
    }

    static clickBackToPosts() {
        return cy.get('.gh-editor-back-button.ember-view').first().click({ force: true });
    }

    static viewContent(content) {
        return cy.get('p[data-koenig-dnd-droppable="true"]').first().should('be.visible').should('include.text', content);
    }

    static deletePost() {
        return cy.get('[data-test-button="delete"]').first().click({ force: true });
    }
}