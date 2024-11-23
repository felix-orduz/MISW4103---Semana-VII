import { faker } from "@faker-js/faker";
import { LogIn } from "../pages/logIn";
import { PostPage } from "../pages/postPage";
import { PrincipalPage } from "../pages/principalPage";
import { FakerGenerador } from "../fixtures/generateRandom";

//JSONs de información
let data = require("../fixtures/properties.json");
let dataPool = require("../fixtures/dataPoolPosts.json");
let dataPoolInvalid = require("../fixtures/dataPoolPostsInvalid.json");

//Manejo de excepciones
Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false;
  }
});

describe("Escenarios E0001 - E0003", function () {
  let randomRow;

  beforeEach(() => {
    cy.fixture("properties.json").then((data) => {
      //Vistamos sitio de Ghost
      cy.visit(data.baseURL);

      //Iniciamos sesion
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot("ss");
      cy.wait(1000);

      //Guardamos la apiKey de posts
      let apiKey = data.apiKey;

      //Realizamos la solicitud a la API de Mockaroo
      cy.request({
        method: "GET",
        url: `https://my.api.mockaroo.com/posts_schema.json?key=${apiKey}`,
      }).then((response) => {
        // Verificamos que la respuesta sea exitosa
        expect(response.status).to.eq(200);

        //Seleccionamos data para la prueba
        randomRow =
          response.body[Math.floor(Math.random() * response.body.length)];
      });
    });
  });

  it("E0001 - Crear un post con titulo (A-priori)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = dataPool[0].tituloPost;
    PostPage.writeTitle(titulo);
    cy.screenshot("ss");

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
    PostPage.lastPostCreated(titulo, "notClick");
    cy.wait(1000);
    cy.screenshot("ss");
  });

  it("E0002 - Crear un post con titulo (Pseudo)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = randomRow.tituloPost;
    PostPage.writeTitle(titulo);
    cy.screenshot("ss");

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
    PostPage.lastPostCreated(titulo, "notClick");
    cy.wait(1000);
    cy.screenshot("ss");
  });

  it("E0003 - Crear un post con titulo (Aletorio)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = FakerGenerador.generateRandomData();
    PostPage.writeTitle(titulo);
    cy.screenshot("ss");

    //And da click en contenido
    PostPage.clickInContent();
    cy.wait(1000);

    //And le da click en el boton de Publish
    PostPage.publishPostButton();
    cy.wait(1000);

    //And le da click en el boton Continue, final review
    PostPage.continueButton();

    //When le da click en el boton Publish post, right now
    PostPage.publishPostButtonFinal();

    //Then cierre el modal de confirmación de publicación
    PostPage.closePublishModal();
  });
});

describe("Escenarios E0004 - E0006", function () {
  let randomRow;

  beforeEach(() => {
    cy.fixture("properties.json").then((data) => {
      //Vistamos sitio de Ghost
      cy.visit(data.baseURL);

      //Iniciamos sesion
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot("ss");
      cy.wait(1000);

      //Guardamos la apiKey de posts
      let apiKey = data.apiKey;

      //Realizamos la solicitud a la API de Mockaroo
      cy.request({
        method: "GET",
        url: `https://my.api.mockaroo.com/posts_schema.json?key=${apiKey}`,
      }).then((response) => {
        // Verificamos que la respuesta sea exitosa
        expect(response.status).to.eq(200);

        //Seleccionamos data para la prueba
        randomRow =
          response.body[Math.floor(Math.random() * response.body.length)];
      });
    });
  });

  it("E0004 - Crear un post con contenido (A-priori)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = dataPool[1].tituloPost;
    PostPage.writeTitle(titulo);
    cy.screenshot("ss");

    //And escribe el contenido
    let contenido = dataPool[1].contenidoPost;
    PostPage.writeContent(contenido);
    cy.screenshot("ss");

    //And le de click en el boton de Publish
    PostPage.publishPostButton();
    cy.wait(1000);

    //And le da click en el boton Continue, final review
    PostPage.continueButton();

    //And le da click en el boton Publish post, right now
    PostPage.publishPostButtonFinal();
    cy.wait(1000);

    //And cierre el modal de confirmación de publicación
    PostPage.closePublishModal();
    cy.wait(1000);

    //When le de click en el post creado
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //Then el contenido del post debería ser el que se escribió
    PostPage.viewContent(contenido);
    cy.wait(1000);
    cy.screenshot("ss");
  });

  it("E0005 - Crear un post con contenido (Pseudo)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = randomRow.tituloPost;
    PostPage.writeTitle(titulo);
    cy.screenshot("ss");

    //And escribe el contenido
    let contenido = randomRow.contenidoPost;
    PostPage.writeContent(contenido);
    cy.screenshot("ss");

    //And le de click en el boton de Publish
    PostPage.publishPostButton();
    cy.wait(1000);

    //And le da click en el boton Continue, final review
    PostPage.continueButton();

    //And le da click en el boton Publish post, right now
    PostPage.publishPostButtonFinal();
    cy.wait(1000);

    //And cierre el modal de confirmación de publicación
    PostPage.closePublishModal();
    cy.wait(1000);

    //When le de click en el post creado
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //Then el contenido del post debería ser el que se escribió
    PostPage.viewContent(contenido);
    cy.wait(1000);
    cy.screenshot("ss");
  });

  it("E0006 - Crear un post con contenido (Aleatorio)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = FakerGenerador.generateRandomData();
    PostPage.writeTitle(titulo);
    cy.screenshot("ss");

    //And escribe el contenido
    let contenido = FakerGenerador.generateRandomData();
    PostPage.writeContent(contenido);
    cy.screenshot("ss");

    //And le de click en el boton de Publish
    PostPage.publishPostButton();
    cy.wait(1000);

    //And le da click en el boton Continue, final review
    PostPage.continueButton();

    //And le da click en el boton Publish post, right now
    PostPage.publishPostButtonFinal();
    cy.wait(1000);

    //When cierre el modal de confirmación de publicación
    PostPage.closePublishModal();
    cy.wait(1000);

    //Then le de click en el post creado
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("ss");
  });
});

describe("Escenarios E0007 - E0009", function () {
  let randomRow;

  beforeEach(() => {
    cy.fixture("properties.json").then((data) => {
      //Vistamos sitio de Ghost
      cy.visit(data.baseURL);

      //Iniciamos sesion
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot("ss");
      cy.wait(1000);

      //Guardamos la apiKey de posts
      let apiKey = data.apiKey;

      //Realizamos la solicitud a la API de Mockaroo
      cy.request({
        method: "GET",
        url: `https://my.api.mockaroo.com/posts_schema.json?key=${apiKey}`,
      }).then((response) => {
        // Verificamos que la respuesta sea exitosa
        expect(response.status).to.eq(200);

        //Seleccionamos data para la prueba
        randomRow =
          response.body[Math.floor(Math.random() * response.body.length)];
      });
    });
  });

  it("E0007 - Editar el titulo de un post previamente creado (A-priori)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = dataPool[2].tituloPost;
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = dataPool[2].contenidoPost;
    PostPage.writeContent(contenido);
    cy.screenshot("ss");

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
    cy.screenshot("ss");

    //And le de click en el post creado
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //And edito el titulo del post
    let tituloEditado = dataPool[2].tituloEditado;
    PostPage.writeTitle(tituloEditado);
    cy.screenshot("ss");

    //And le de click en el boton de update
    PostPage.updatePostButton();

    //When le de click en el boton de devolverse a la lista de posts
    PostPage.clickBackToPosts();

    //Then debería ver el post publicado en la lista de posts con titulo editado
    PostPage.lastPostCreated(tituloEditado, "notClick");
    cy.wait(1000);
    cy.screenshot("ss");
  });

  it("E0008 - Editar el titulo de un post previamente creado (Pseudo)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = randomRow.tituloPost;
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = randomRow.contenidoPost;
    PostPage.writeContent(contenido);
    cy.screenshot("ss");

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
    cy.screenshot("ss");

    //And le de click en el post creado
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //And edito el titulo del post
    let tituloEditado = randomRow.tituloEditadoPost;
    PostPage.writeTitle(tituloEditado);
    cy.screenshot("ss");

    //And le de click en el boton de update
    PostPage.updatePostButton();

    //When le de click en el boton de devolverse a la lista de posts
    PostPage.clickBackToPosts();

    //Then debería ver el post publicado en la lista de posts con titulo editado
    PostPage.lastPostCreated(tituloEditado, "notClick");
    cy.wait(1000);
    cy.screenshot("ss");
  });

  it("E0009 - Editar el titulo de un post previamente creado (Aleatorio)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = FakerGenerador.generateRandomData();
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = FakerGenerador.generateRandomData();
    PostPage.writeContent(contenido);
    cy.screenshot("ss");

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
    cy.screenshot("ss");

    //And le de click en el post creado
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //And edito el titulo del post
    let tituloEditado = FakerGenerador.generateRandomData();
    PostPage.writeTitle(tituloEditado);
    cy.screenshot("ss");

    //When le de click en el boton de update
    PostPage.updatePostButton();

    //Then le de click en el boton de devolverse a la lista de posts
    PostPage.clickBackToPosts();
  });
});

describe("Escenarios E00010 - E00012", function () {
  let randomRow;

  beforeEach(() => {
    cy.fixture("properties.json").then((data) => {
      //Vistamos sitio de Ghost
      cy.visit(data.baseURL);

      //Iniciamos sesion
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot("ss");
      cy.wait(1000);

      //Guardamos la apiKey de posts
      let apiKey = data.apiKey;

      //Realizamos la solicitud a la API de Mockaroo
      cy.request({
        method: "GET",
        url: `https://my.api.mockaroo.com/posts_schema.json?key=${apiKey}`,
      }).then((response) => {
        // Verificamos que la respuesta sea exitosa
        expect(response.status).to.eq(200);

        //Seleccionamos data para la prueba
        randomRow =
          response.body[Math.floor(Math.random() * response.body.length)];
      });
    });
  });

  it("E00010 - Editar el contenido de un post previamente creado (A-priori)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = dataPool[3].tituloPost;
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = dataPool[3].contenidoPost;
    PostPage.writeContent(contenido);
    cy.screenshot("ss");

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
    cy.screenshot("ss");

    //And le de click en el post creado
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //And edita el contenido del post
    let contenidoEditado = dataPool[3].contenidoEditado;
    PostPage.writeContent(contenidoEditado);
    cy.screenshot("ss");

    //And le de click en el boton de update
    PostPage.updatePostButton();

    //And le de click en el boton de devolverse a la lista de posts
    PostPage.clickBackToPosts();
    cy.wait(1000);

    //When le de click en el post editado
    PostPage.lastPostCreated(titulo, "click");

    //Then el contenido del post debería ser el editado
    PostPage.viewContent(contenidoEditado);
    cy.wait(1000);
    cy.screenshot("ss");
  });

  it("E00011 - Editar el contenido de un post previamente creado (Pseudo)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = randomRow.tituloPost;
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = randomRow.contenidoPost;
    PostPage.writeContent(contenido);
    cy.screenshot("ss");

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
    cy.screenshot("ss");

    //And le de click en el post creado
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //And edita el contenido del post
    let contenidoEditado = randomRow.contenidoEditadoPost;
    PostPage.writeContent(contenidoEditado);
    cy.screenshot("ss");

    //And le de click en el boton de update
    PostPage.updatePostButton();

    //And le de click en el boton de devolverse a la lista de posts
    PostPage.clickBackToPosts();
    cy.wait(1000);

    //When le de click en el post editado
    PostPage.lastPostCreated(titulo, "click");

    //Then el contenido del post debería ser el editado
    PostPage.viewContent(contenidoEditado);
    cy.wait(1000);
    cy.screenshot("ss");
  });

  it("E00012 - Editar el contenido de un post previamente creado (Aleatorio)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = FakerGenerador.generateRandomData();
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = FakerGenerador.generateRandomData();
    PostPage.writeContent(contenido);
    cy.screenshot("ss");

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
    cy.screenshot("ss");

    //And le de click en el post creado
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //And edita el contenido del post
    let contenidoEditado = FakerGenerador.generateRandomData();
    PostPage.writeContent(contenidoEditado);
    cy.screenshot("ss");

    //And le de click en el boton de update
    PostPage.updatePostButton();

    //When le de click en el boton de devolverse a la lista de posts
    PostPage.clickBackToPosts();
    cy.wait(1000);

    //Then le de click en el post editado
    PostPage.lastPostCreated(titulo, "click");
  });
});

describe("Escenarios E00013 - E00015", function () {
  let randomRow;

  beforeEach(() => {
    cy.fixture("properties.json").then((data) => {
      //Vistamos sitio de Ghost
      cy.visit(data.baseURL);

      //Iniciamos sesion
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot("ss");
      cy.wait(1000);

      //Guardamos la apiKey de posts
      let apiKey = data.apiKey;

      //Realizamos la solicitud a la API de Mockaroo
      cy.request({
        method: "GET",
        url: `https://my.api.mockaroo.com/posts_schema.json?key=${apiKey}`,
      }).then((response) => {
        // Verificamos que la respuesta sea exitosa
        expect(response.status).to.eq(200);

        //Seleccionamos data para la prueba
        randomRow =
          response.body[Math.floor(Math.random() * response.body.length)];
      });
    });
  });

  it("E00013 - Eliminamos un post previamente creado (A-priori)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = dataPool[4].tituloPost;
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = dataPool[4].contenidoPost;
    PostPage.writeContent(contenido);
    cy.screenshot("ss");

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
    cy.screenshot("ss");

    //And le de click derecho en el post creado
    PostPage.lastPostCreated(titulo, "rightClick");
    cy.screenshot("ss");

    //When le da click en el boton de delete
    PostPage.deletePost();

    //Then el post es eliminado
    PostPage.deletePostModal();
    cy.wait(1000);
    cy.screenshot("ss");
  });

  it("E00014 - Eliminamos un post previamente creado (Pseudo)", function () {
    //Creamos semilla de faker
    faker.seed(123);

    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = randomRow.tituloPost;
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = randomRow.contenidoPost;
    PostPage.writeContent(contenido);
    cy.screenshot("ss");

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
    cy.screenshot("ss");

    //And le de click derecho en el post creado
    PostPage.lastPostCreated(titulo, "rightClick");
    cy.screenshot("ss");

    //When le da click en el boton de delete
    PostPage.deletePost();

    //Then el post es eliminado
    PostPage.deletePostModal();
    cy.wait(1000);
    cy.screenshot("ss");
  });

  it("E00015 - Eliminamos un post previamente creado (Aleatorio)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = FakerGenerador.generateRandomData();
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = FakerGenerador.generateRandomData();
    PostPage.writeContent(contenido);
    cy.screenshot("ss");

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
    cy.screenshot("ss");

    //When le de click derecho en el post creado
    PostPage.lastPostCreated(titulo, "rightClick");
    cy.screenshot("ss");

    //Then le da click en el boton de delete
    PostPage.deletePost();
  });
});

describe("Escenarios E00016 - E00018", function () {
  let randomRow;

  beforeEach(() => {
    cy.fixture("properties.json").then((data) => {
      //Vistamos sitio de Ghost
      cy.visit(data.baseURL);

      //Iniciamos sesion
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot("ss");
      cy.wait(1000);

      //Guardamos la apiKey de posts
      let apiKey = data.apiKey;

      //Realizamos la solicitud a la API de Mockaroo
      cy.request({
        method: "GET",
        url: `https://my.api.mockaroo.com/posts_invalid_schema.json?key=${apiKey}`,
      }).then((response) => {
        // Verificamos que la respuesta sea exitosa
        expect(response.status).to.eq(200);

        //Seleccionamos data para la prueba
        randomRow =
          response.body[Math.floor(Math.random() * response.body.length)];
      });
    });
  });

  it("E00016 - Editar el titulo de un post previamente creado con caracteres especiales (A-priori)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = dataPoolInvalid[2].tituloPost;
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = dataPoolInvalid[2].contenidoPost;
    PostPage.writeContent(contenido);
    cy.screenshot("ss");

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
    cy.screenshot("ss");

    //And le de click en el post creado
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //And edito el titulo del post
    let tituloEditado = dataPoolInvalid[2].tituloEditado;
    PostPage.writeTitle(tituloEditado);
    cy.screenshot("ss");

    //And le de click en el boton de update
    PostPage.updatePostButton();

    //When le de click en el boton de devolverse a la lista de posts
    PostPage.clickBackToPosts();

    //Then debería ver el post publicado en la lista de posts con titulo editado
    PostPage.lastPostCreated(tituloEditado, "notClick");
    cy.wait(1000);
    cy.screenshot("ss");
  });

  it("E00017 - Editar el titulo de un post previamente creado con caracteres especiales (Pseudo)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = randomRow.tituloPost;
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = randomRow.contenidoPost;
    PostPage.writeContent(contenido);
    cy.screenshot("ss");

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
    cy.screenshot("ss");

    //And le de click en el post creado
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //And edito el titulo del post
    let tituloEditado = randomRow.tituloEditadoPost;
    PostPage.writeTitle(tituloEditado);
    cy.screenshot("ss");

    //And le de click en el boton de update
    PostPage.updatePostButton();

    //When le de click en el boton de devolverse a la lista de posts
    PostPage.clickBackToPosts();

    //Then debería ver el post publicado en la lista de posts con titulo editado
    PostPage.lastPostCreated(tituloEditado, "notClick");
    cy.wait(1000);
    cy.screenshot("ss");
  });

  it("E00018 - Editar el titulo de un post previamente creado con caracteres especiales (Aleatorio)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = FakerGenerador.generateRandomData();
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = FakerGenerador.generateRandomData();
    PostPage.writeContent(contenido);
    cy.screenshot("ss");

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
    cy.screenshot("ss");

    //And le de click en el post creado
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("ss");

    //And edito el titulo del post
    let tituloEditado = FakerGenerador.randomSpecialCharacters(10);
    PostPage.writeTitle(tituloEditado);
    cy.screenshot("ss");

    //When le de click en el boton de update
    PostPage.updatePostButton();

    //Then le de click en el boton de devolverse a la lista de posts
    PostPage.clickBackToPosts();
  });
});

describe("Escenarios E00019 - E00021", function () {
  let randomRow;

  beforeEach(() => {
    cy.fixture("properties.json").then((data) => {
      //Vistamos sitio de Ghost
      cy.visit(data.baseURL);

      //Iniciamos sesion
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot("ss");
      cy.wait(1000);

      //Guardamos la apiKey de posts
      let apiKey = data.apiKey;

      //Realizamos la solicitud a la API de Mockaroo
      cy.request({
        method: "GET",
        url: `https://my.api.mockaroo.com/posts_invalid_schema.json?key=${apiKey}`,
      }).then((response) => {
        // Verificamos que la respuesta sea exitosa
        expect(response.status).to.eq(200);

        //Seleccionamos data para la prueba
        randomRow =
          response.body[Math.floor(Math.random() * response.body.length)];
      });
    });
  });

  it("E00019 - Crear un post vacío (A-priori)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = dataPoolInvalid[3].tituloPost;
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = dataPoolInvalid[3].contenidoPost;
    PostPage.writeContent(contenido);
    cy.screenshot("ss");

    //And borramos contenido
    PostPage.clearContent();
    cy.screenshot("ss");

    //And le de click en el boton de Publish
    PostPage.publishPostButton();
    cy.wait(1000);

    //And le da click en el boton Continue, final review
    PostPage.continueButton();

    //When le da click en el boton Publish post, right now
    PostPage.publishPostButtonFinal();

    //Then cierre el modal de confirmación de publicación
    PostPage.closePublishModal();
    cy.wait(1000);
    cy.screenshot("ss");
  });

  it("E00020 - Crear un post vacío (Pseudo)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = randomRow.tituloPost;
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = randomRow.contenidoPost;
    PostPage.writeContent(contenido);
    cy.screenshot("ss");

    //And borramos contenido
    PostPage.clearContent();
    cy.screenshot("ss");

    //And le de click en el boton de Publish
    PostPage.publishPostButton();
    cy.wait(1000);

    //And le da click en el boton Continue, final review
    PostPage.continueButton();

    //When le da click en el boton Publish post, right now
    PostPage.publishPostButtonFinal();

    //Then cierre el modal de confirmación de publicación
    PostPage.closePublishModal();
    cy.wait(1000);
    cy.screenshot("ss");
  });

  it("E00021 - Crear un post vacío (Aleatorio)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("ss");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("ss");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = FakerGenerador.generateRandomData();
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = FakerGenerador.generateRandomData();
    PostPage.writeContent(contenido);
    cy.screenshot("ss");

    //And borramos contenido
    PostPage.clearContent();
    cy.screenshot("ss");

    //And le de click en el boton de Publish
    PostPage.publishPostButton();
    cy.wait(1000);

    //And le da click en el boton Continue, final review
    PostPage.continueButton();

    //When le da click en el boton Publish post, right now
    PostPage.publishPostButtonFinal();

    //Then cierre el modal de confirmación de publicación
    PostPage.closePublishModal();
    cy.wait(1000);
    cy.screenshot("ss");
  });
});
