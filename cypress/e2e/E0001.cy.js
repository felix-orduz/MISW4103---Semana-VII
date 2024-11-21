import { LogIn } from "../../pages/version_rc/logIn";
import { PostPage } from "../../pages/version_rc/postPage";
import { PrincipalPage } from "../../pages/version_rc/principalPage";
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
            cy.screenshot('../../ghost-5.96/E0001-0-RC');
            cy.wait(1000);
        });
    });

    it('E0001 - Crear un post con titulo', function () {
        //Given que voy a la sección de posts
        PrincipalPage.clickPosts();
        cy.wait(1000);
        cy.screenshot('../../ghost-5.96/E0001-1-RC');

        //And el administrador ve la página de listado de posts
        PostPage.getTitleSection().should('include.text', 'Posts');

        //And le da click en el boton New Post
        PostPage.clickNewPost();
        cy.screenshot('../../ghost-5.96/E0001-2-RC');

        //And el administrador ve la página de creación de post
        PostPage.creationPostPage().should('have.value', '');

        //And escribe el titulo del post
        let titulo = 'titulo E0001';
        PostPage.writeTitle(titulo);
        cy.screenshot('../../ghost-5.96/E0001-3-RC');

        //And da click en contenido
        PostPage.clickInContent();
        cy.wait(1000);

        //And le da click en el boton de Publish
        PostPage.publishPostButton();
        cy.wait(1000);

        //And le da click en el boton Continue, final review
        PostPage.continueButton();

        //And le da click en el boton Publish post, right now
        PostPage.publishPostButtonFinal();

        //When cierre el modal de confirmación de publicación
        PostPage.closePublishModal();

        //Then debería ver el post publicado en la lista de posts
        PostPage.lastPostCreated(titulo, 'notClick');
        cy.wait(1000);
        cy.screenshot('../../ghost-5.96/E0001-4-RC');
    });
});