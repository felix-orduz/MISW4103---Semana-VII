import { LogIn } from "../../pages/version_base/logIn";
import { PostPage } from "../../pages/version_base/postPage";
import { PrincipalPage } from "../../pages/version_base/principalPage";
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
        cy.screenshot('../../ghost-4.5/E0002-0-BS');
        cy.wait(1000);
    });
  });

    it('E0002 - Crear un post con contenido', function () {
      //Given que voy a la sección de posts
      PrincipalPage.clickPosts();
      cy.wait(1000);
      cy.screenshot('../../ghost-4.5/E0002-1-BS');

      //And el administrador ve la página de listado de posts
      PostPage.getTitleSection().should('include.text', 'Posts');

      //And le da click en el boton New Post
      PostPage.clickNewPost();
      cy.screenshot('../../ghost-4.5/E0002-2-BS');

      //And el administrador ve la página de creación de post
      PostPage.creationPostPage().should('have.value', '');

      //And escribe el titulo del post
      let titulo = 'titulo E0002';
      PostPage.writeTitle(titulo);
      cy.screenshot('../../ghost-4.5/E0002-3-BS');

      //And da click en contenido
      PostPage.clickInContent();

      //And escribe el contenido del post
      let contenido = 'contenido E0002';
      PostPage.writeContent(contenido);
      cy.screenshot('../../ghost-4.5/E0002-4-BS');

      //And le da click en el boton de Publish
      PostPage.publishPostButton();

      //And le da click en el boton Publish post, right now
      PostPage.publishPostButtonFinal();
      cy.wait(1000);

      //And se devuelve a la lista de posts
      PostPage.clickBackToPosts();
      cy.wait(1000);

      //When le da click en el post creado
      PostPage.lastPostCreated(titulo, 'click');
      cy.wait(1000);
      cy.screenshot('../../ghost-4.5/E0002-5-BS');

      //Then deberia ver el contenido del post
      PostPage.viewContent(contenido);
      cy.wait(1000);
      cy.screenshot('../../ghost-4.5/E0002-6-BS');
  });
});