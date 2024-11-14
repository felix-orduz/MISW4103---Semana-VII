import { LogIn } from "../pages/logIn";
import { PostPage } from "../pages/postPage";
import { PrincipalPage } from "../pages/principalPage";
import { faker } from '@faker-js/faker';
const data = require('../fixtures/properties.json');

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

        //And el administrador ve la página de listado de posts
        PostPage.getTitleSection().should('include.text', 'Posts');

        //And le da click en el boton New Post
        PostPage.clickNewPost();

        //And el administrador ve la página de creación de post
        PostPage.creationPostPage().should('have.value', '');

        //And escribe el titulo del post
        let titulo = faker.lorem.word();
        PostPage.writeTitle(titulo);

        //And escribe el contenido del post
        let contenido = faker.lorem.words();
        PostPage.writeContent(contenido);

        //And borra el contenido si hay algo
        PostPage.clearContent();

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
    });
});