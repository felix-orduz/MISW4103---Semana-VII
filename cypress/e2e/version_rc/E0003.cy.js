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
        cy.screenshot('../../ghost-5.96/E0003-0-RC');
        cy.wait(1000);
    });
  });

    it('E0003 - Editar el titulo de un post previamente creado', function () {
        //Given que voy a la sección de posts
        PrincipalPage.clickPosts();
        cy.wait(1000);
        cy.screenshot('../../ghost-5.96/E0003-1-RC');

        //And el administrador ve la página de listado de posts
        PostPage.getTitleSection().should('include.text', 'Posts');

        //And le da click en el boton New Post
        PostPage.clickNewPost();
        cy.screenshot('../../ghost-5.96/E0003-2-RC');

        //And el administrador ve la página de creación de post
        PostPage.creationPostPage().should('have.value', '');

        //And escribe el titulo del post
        let titulo = 'titulo E0003';
        PostPage.writeTitle(titulo);

        //And escribe el contenido
        let contenido = 'contenido E0003';
        PostPage.writeContent(contenido);
        cy.screenshot('../../ghost-5.96/E0003-3-RC');

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
        cy.screenshot('../../ghost-5.96/E0003-4-RC');

        //And le de click en el post creado
        PostPage.lastPostCreated(titulo, 'click');
        cy.wait(1000);
        cy.screenshot('../../ghost-5.96/E0003-5-RC');

        //And edito el titulo del post
        let tituloEditado = 'titulo editado E0003';
        PostPage.writeTitle(tituloEditado);
        cy.screenshot('../../ghost-5.96/E0003-6-RC');

        //And le de click en el boton de update
        PostPage.updatePostButton();

        //When le de click en el boton de devolverse a la lista de posts
        PostPage.clickBackToPosts();

        //Then debería ver el post publicado en la lista de posts con titulo editado
        PostPage.lastPostCreated(tituloEditado, 'notClick');
        cy.wait(1000);
        cy.screenshot('../../ghost-5.96/E0003-7-RC');
    });
});