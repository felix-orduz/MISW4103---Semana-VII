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

    it('E0002 - Crear un post con contenido', function () {
        //Given que voy a la sección de posts
        PrincipalPage.clickPosts();
        // cy.screenshot('E0002-1-RC');

        //And el administrador ve la página de listado de posts
        PostPage.getTitleSection().should('include.text', 'Posts');
        // cy.screenshot('E0002-2-RC');

        //And le da click en el boton New Post
        PostPage.clickNewPost();
        // cy.screenshot('E0002-2-RC');

        //And el administrador ve la página de creación de post
        PostPage.creationPostPage().should('have.value', '');
        // cy.screenshot('E0002-3-RC');

        //And escribe el titulo del post
        let titulo = faker.lorem.word();
        PostPage.writeTitle(titulo);
        // cy.screenshot('E0002-4-RC');

        //And escribe el contenido
        let contenido = faker.lorem.words();
        PostPage.writeContent(contenido);
        // cy.screenshot('E0002-5-RC');

        //And le de click en el boton de Publish
        PostPage.publishPostButton();
        cy.wait(1000);
        // cy.screenshot('E0002-6-RC');

        //And le da click en el boton Continue, final review
        PostPage.continueButton();
        // cy.screenshot('E0002-7-RC');

        //And le da click en el boton Publish post, right now
        PostPage.publishPostButtonFinal();
        cy.wait(1000);

        //And cierre el modal de confirmación de publicación
        PostPage.closePublishModal();
        cy.wait(1000);
        
        //When le de click en el post creado
        PostPage.lastPostCreated(titulo, 'click');

        //Then el contenido del post debería ser el que se escribió
        PostPage.viewContent(contenido);
        cy.wait(1000);
        // cy.screenshot('E0002-9-RC');
    });
});