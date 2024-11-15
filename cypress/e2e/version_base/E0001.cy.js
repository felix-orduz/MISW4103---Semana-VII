import { LogIn } from "../../pages/version_base/logIn";
import { PostPage } from "../../pages/version_base/postPage";
import { PrincipalPage } from "../../pages/version_base/principalPage";
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
        cy.screenshot('E0001-1-BS');

        //And el administrador ve la página de listado de posts
        PostPage.getTitleSection().should('include.text', 'Posts');

        //And le da click en el boton New Post
        PostPage.clickNewPost();
        cy.screenshot('E0001-2-BS');

        //And el administrador ve la página de creación de post
        PostPage.creationPostPage().should('have.value', '');

        //And escribe el titulo del post
        let titulo = faker.lorem.word();
        PostPage.writeTitle(titulo);
        cy.screenshot('E0001-5-BS');

        //And da click en contenido
        PostPage.clickInContent();

        //And le da click en el boton de Publish
        PostPage.publishPostButton();
        // cy.screenshot('E0001-8-BS');

        //And le da click en el boton Publish post, right now
        PostPage.publishPostButtonFinal();
        cy.wait(1000);
        // cy.screenshot('E0001-10-BS');

        //When se devuelva a la lista de posts
        PostPage.clickBackToPosts();
        cy.wait(1000);

        //Then debería ver el post publicado en la lista de posts
        PostPage.lastPostCreated(titulo, 'notClick');
        cy.wait(1000);
        // cy.screenshot('E0001-11-BS');
    });
});