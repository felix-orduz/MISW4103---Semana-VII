import { LogIn } from "../../pages/version_rc/logIn";
import { PostPage } from "../../pages/version_rc/postPage";
import { PrincipalPage } from "../../pages/version_rc/principalPage";
import { faker } from '@faker-js/faker';
const data = require('../../fixtures/properties.json');

Cypress.on("uncaught:exception", (err, runnable) => {
    if (err.message.includes("The play() request was interrupted")) {
      return false;
    }
  });

describe('Escenarios E2E para Ghost', function () {

    beforeEach(() => {
        cy.fixture('properties.json').then((data) => {
            //Vistamos sitio de Ghost
            cy.visit(data.baseURL);

            //Iniciamos sesion
            LogIn.logIn(data.email, data.password);
            LogIn.logInButton();
        });
    });

    it('E0001 - Crear un post con titulo', function () {
        //Given que voy a la sección de posts
        PrincipalPage.clickPosts();
        // cy.screenshot('E0001-1-RC');

        //And el administrador ve la página de listado de posts
        PostPage.getTitleSection().should('include.text', 'Posts');
        // cy.screenshot('E0001-2-RC');

        //And le da click en el boton New Post
        PostPage.clickNewPost();
        // cy.screenshot('E0001-3-RC');

        //And el administrador ve la página de creación de post
        PostPage.creationPostPage().should('have.value', '');
        // cy.screenshot('E0001-4-RC');

        //And escribe el titulo del post
        let titulo = faker.lorem.word();
        PostPage.writeTitle(titulo);
        // cy.screenshot('E0001-5-RC');

        //And escribe el contenido del post
        let contenido = faker.lorem.words();
        PostPage.writeContent(contenido);
        // cy.screenshot('E0001-6-RC');

        //And borra el contenido si hay algo
        PostPage.clearContent();
        // cy.screenshot('E0001-7-RC');

        //And le da click en el boton de Publish
        PostPage.publishPostButton();
        cy.wait(1000);
        // cy.screenshot('E0001-8-RC');

        //And le da click en el boton Continue, final review
        PostPage.continueButton();
        // cy.screenshot('E0001-9-RC');

        //And le da click en el boton Publish post, right now
        PostPage.publishPostButtonFinal();
        // cy.screenshot('E0001-10-RC');

        //When cierre el modal de confirmación de publicación
        PostPage.closePublishModal();

        //Then debería ver el post publicado en la lista de posts
        PostPage.lastPostCreated(titulo, 'notClick');
        cy.wait(1000);
        // cy.screenshot('E0001-11-RC');
    });
});