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
        cy.screenshot('../../ghost-5.96/E0004-0-RC');
        cy.wait(1000);
    });
  });

    it('E0004 - Editar el contenido de un post previamente creado', function () {
        //Given que voy a la sección de posts
        PrincipalPage.clickPosts();
        cy.wait(1000);
        cy.screenshot('../../ghost-5.96/E0004-1-RC');

        //And el administrador ve la página de listado de posts
        PostPage.getTitleSection().should('include.text', 'Posts');

        //And le da click en el boton New Post
        PostPage.clickNewPost();
        cy.screenshot('../../ghost-5.96/E0004-2-RC');

        //And el administrador ve la página de creación de post
        PostPage.creationPostPage().should('have.value', '');

        //And escribe el titulo del post
        let titulo = 'titulo E0004'
        PostPage.writeTitle(titulo);

        //And escribe el contenido
        let contenido = 'contenido E0004'
        PostPage.writeContent(contenido);
        cy.screenshot('../../ghost-5.96/E0004-3-RC');

        //And le de click en el boton de Publish
        PostPage.publishPostButton();
        cy.wait(1000);

        //And le da click en el boton Continue, final review
        PostPage.continueButton();
       
        //And le da click en el boton Publish post, right now
        PostPage.publishPostButtonFinal();

        //And cierre el modal de confirmación de publicación
        PostPage.closePublishModal();
        cy.wait(1000);
        cy.screenshot('../../ghost-5.96/E0004-4-RC');

        //And le de click en el post creado
        PostPage.lastPostCreated(titulo, 'click');
        cy.wait(1000);
        cy.screenshot('../../ghost-5.96/E0004-5-RC');

        //And edita el contenido del post
        let contenidoEditado = 'contenido editado E0004'
        PostPage.writeContent(contenidoEditado);
        cy.screenshot('../../ghost-5.96/E0004-6-RC');

        //And le de click en el boton de update
        PostPage.updatePostButton();

        //And le de click en el boton de devolverse a la lista de posts
        PostPage.clickBackToPosts();
        cy.wait(1000);

        //When le de click en el post editado
        PostPage.lastPostCreated(titulo, 'click');

        //Then el contenido del post debería ser el editado
        PostPage.viewContent(contenidoEditado);
        cy.wait(1000);
        cy.screenshot('../../ghost-5.96/E0004-7-RC');
    });
});