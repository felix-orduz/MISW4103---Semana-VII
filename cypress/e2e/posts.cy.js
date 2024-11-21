import { faker } from "@faker-js/faker";
import { LogIn } from "../pages/logIn";
import { PostPage } from "../pages/postPage";
import { PrincipalPage } from "../pages/principalPage";

//JSONs de información
let data = require("../fixtures/properties.json");
let dataPool = require("../fixtures/dataPoolPosts.json");

//Categorias faker
let categoryMethods = {
    name: ['fullName', 'firstName', 'lastName', 'jobTitle'],
    address: ['streetAddress', 'city', 'state', 'country', 'zipCode'],
    internet: ['email', 'userName', 'url', 'domainName', 'password'],
    commerce: ['productName', 'price', 'department', 'productDescription'],
    company: ['companyName', 'catchPhrase', 'industry'],
    finance: ['account', 'amount', 'currencyCode'],
    phone: ['phoneNumber'],
    lorem: ['word', 'sentence', 'paragraph'],
};

//Manejo de excepciones
Cypress.on("uncaught:exception", (err, runnable) => {
  if (err.message.includes("The play() request was interrupted")) {
    return false;
  }
});

describe("Escenarios E0001 - E0003", function () {
  beforeEach(() => {
    cy.fixture("properties.json").then((data) => {
      //Vistamos sitio de Ghost
      cy.visit(data.baseURL);

      //Iniciamos sesion
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot("../../ghost-5.96/E0001-0-RC");
      cy.wait(1000);
    });
  });

  it("E0001 - Crear un post con titulo (A-priori)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0001-1-RC");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("../../ghost-5.96/E0001-2-RC");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = dataPool[0].tituloPost;
    PostPage.writeTitle(titulo);
    cy.screenshot("../../ghost-5.96/E0001-3-RC");

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
    cy.screenshot("../../ghost-5.96/E0001-4-RC");
  });

  it("E0002 - Crear un post con titulo (Pseudo)", function () {
    //Creamos semilla de faker
    faker.seed(123);

    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0001-1-RC");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("../../ghost-5.96/E0001-2-RC");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = faker.lorem.word();
    PostPage.writeTitle(titulo);
    cy.screenshot("../../ghost-5.96/E0001-3-RC");

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
    cy.screenshot("../../ghost-5.96/E0001-4-RC");
  });

  it("E0003 - Crear un post con titulo (Aletorio)", function () {
    //Generamos datos aleatorios con faker
    faker.seed();
    let randomCategory = faker.helpers.arrayElement(Object.keys(categoryMethods));
    let randomMethod = faker.helpers.objectKey(faker[randomCategory]);
    let randomData = faker[randomCategory][randomMethod]();

    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0001-1-RC");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("../../ghost-5.96/E0001-2-RC");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = randomData;
    PostPage.writeTitle(titulo);
    cy.screenshot("../../ghost-5.96/E0001-3-RC");

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
  });
});

describe("Escenarios E0004 - E0006", function () {
  beforeEach(() => {
    cy.fixture("properties.json").then((data) => {
      //Vistamos sitio de Ghost
      cy.visit(data.baseURL);

      //Iniciamos sesion
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot("../../ghost-5.96/E0001-0-RC");
      cy.wait(1000);
    });
  });

  it("E0004 - Crear un post con contenido (A-priori)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0002-1-RC");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("../../ghost-5.96/E0002-2-RC");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = dataPool[1].tituloPost;
    PostPage.writeTitle(titulo);
    cy.screenshot("../../ghost-5.96/E0002-3-RC");

    //And escribe el contenido
    let contenido = dataPool[1].contenidoPost;
    PostPage.writeContent(contenido);
    cy.screenshot("../../ghost-5.96/E0002-4-RC");

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
    cy.screenshot("../../ghost-5.96/E0002-5-RC");

    //Then el contenido del post debería ser el que se escribió
    PostPage.viewContent(contenido);
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0002-6-RC");
  });

  it("E0005 - Crear un post con contenido (Pseudo)", function () {
    //Creamos semilla de faker
    faker.seed(123);

    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0002-1-RC");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("../../ghost-5.96/E0002-2-RC");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = faker.lorem.word();
    PostPage.writeTitle(titulo);
    cy.screenshot("../../ghost-5.96/E0002-3-RC");

    //And escribe el contenido
    let contenido = faker.lorem.paragraph();
    PostPage.writeContent(contenido);
    cy.screenshot("../../ghost-5.96/E0002-4-RC");

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
    cy.screenshot("../../ghost-5.96/E0002-5-RC");

    //Then el contenido del post debería ser el que se escribió
    PostPage.viewContent(contenido);
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0002-6-RC");
  });

  it("E0006 - Crear un post con contenido (Aleatorio)", function () {
    //Creamos semilla de faker
    faker.seed();
    let randomCategory = faker.helpers.arrayElement(Object.keys(categoryMethods));
    let randomMethod = faker.helpers.objectKey(faker[randomCategory]);
    let randomData = faker[randomCategory][randomMethod]();

    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0002-1-RC");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("../../ghost-5.96/E0002-2-RC");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = randomData;
    PostPage.writeTitle(titulo);
    cy.screenshot("../../ghost-5.96/E0002-3-RC");

    //And escribe el contenido
    let contenido = faker.lorem.paragraph();
    PostPage.writeContent(contenido);
    cy.screenshot("../../ghost-5.96/E0002-4-RC");

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
    cy.screenshot("../../ghost-5.96/E0002-5-RC");
  });
});

describe("Escenarios E0007 - E0009", function () {
  beforeEach(() => {
    cy.fixture("properties.json").then((data) => {
      //Vistamos sitio de Ghost
      cy.visit(data.baseURL);

      //Iniciamos sesion
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot("../../ghost-5.96/E0001-0-RC");
      cy.wait(1000);
    });
  });

  it("E0007 - Editar el titulo de un post previamente creado (A-priori)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0003-1-RC");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("../../ghost-5.96/E0003-2-RC");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = dataPool[2].tituloPost;
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = dataPool[2].contenidoPost;
    PostPage.writeContent(contenido);
    cy.screenshot("../../ghost-5.96/E0003-3-RC");

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
    cy.screenshot("../../ghost-5.96/E0003-4-RC");

    //And le de click en el post creado
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0003-5-RC");

    //And edito el titulo del post
    let tituloEditado = dataPool[2].tituloEditado;
    PostPage.writeTitle(tituloEditado);
    cy.screenshot("../../ghost-5.96/E0003-6-RC");

    //And le de click en el boton de update
    PostPage.updatePostButton();

    //When le de click en el boton de devolverse a la lista de posts
    PostPage.clickBackToPosts();

    //Then debería ver el post publicado en la lista de posts con titulo editado
    PostPage.lastPostCreated(tituloEditado, "notClick");
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0003-7-RC");
  });

  it("E0008 - Editar el titulo de un post previamente creado (Pseudo)", function () {
    //Creamos semilla de faker
    faker.seed(123);

    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0003-1-RC");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("../../ghost-5.96/E0003-2-RC");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = faker.lorem.word();
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = faker.lorem.paragraph();
    PostPage.writeContent(contenido);
    cy.screenshot("../../ghost-5.96/E0003-3-RC");

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
    cy.screenshot("../../ghost-5.96/E0003-4-RC");

    //And le de click en el post creado
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0003-5-RC");

    //And edito el titulo del post
    let tituloEditado = faker.lorem.word(5);
    PostPage.writeTitle(tituloEditado);
    cy.screenshot("../../ghost-5.96/E0003-6-RC");

    //And le de click en el boton de update
    PostPage.updatePostButton();

    //When le de click en el boton de devolverse a la lista de posts
    PostPage.clickBackToPosts();

    //Then debería ver el post publicado en la lista de posts con titulo editado
    PostPage.lastPostCreated(tituloEditado, "notClick");
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0003-7-RC");
  });

  it("E0009 - Editar el titulo de un post previamente creado (Aleatorio)", function () {
    //Creamos semilla de faker
    faker.seed();
    let randomCategory = faker.helpers.arrayElement(Object.keys(categoryMethods));
    let randomMethod = faker.helpers.objectKey(faker[randomCategory]);
    let randomData = faker[randomCategory][randomMethod]();

    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0003-1-RC");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("../../ghost-5.96/E0003-2-RC");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = randomData;
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = faker.lorem.paragraph();
    PostPage.writeContent(contenido);
    cy.screenshot("../../ghost-5.96/E0003-3-RC");

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
    cy.screenshot("../../ghost-5.96/E0003-4-RC");

    //And le de click en el post creado
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0003-5-RC");

    //And edito el titulo del post
    let tituloEditado = faker.lorem.word();
    PostPage.writeTitle(tituloEditado);
    cy.screenshot("../../ghost-5.96/E0003-6-RC");

    //And le de click en el boton de update
    PostPage.updatePostButton();

    //When le de click en el boton de devolverse a la lista de posts
    PostPage.clickBackToPosts();
  });
});

describe("Escenarios E00010 - E00012", function () {
  beforeEach(() => {
    cy.fixture("properties.json").then((data) => {
      //Vistamos sitio de Ghost
      cy.visit(data.baseURL);

      //Iniciamos sesion
      LogIn.logIn(data.email, data.password);
      LogIn.logInButton();
      cy.screenshot("../../ghost-5.96/E0001-0-RC");
      cy.wait(1000);
    });
  });

  it("E00010 - Editar el contenido de un post previamente creado (A-priori)", function () {
    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0004-1-RC");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("../../ghost-5.96/E0004-2-RC");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = dataPool[3].tituloPost;
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = dataPool[3].contenidoPost; 
    PostPage.writeContent(contenido);
    cy.screenshot("../../ghost-5.96/E0004-3-RC");

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
    cy.screenshot("../../ghost-5.96/E0004-4-RC");

    //And le de click en el post creado
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0004-5-RC");

    //And edita el contenido del post
    let contenidoEditado = dataPool[3].contenidoEditado;
    PostPage.writeContent(contenidoEditado);
    cy.screenshot("../../ghost-5.96/E0004-6-RC");

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
    cy.screenshot("../../ghost-5.96/E0004-7-RC");
  });

  it("E00011 - Editar el contenido de un post previamente creado (Pseudo)", function () {
    //Creamos semilla de faker
    faker.seed(123);

    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0004-1-RC");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("../../ghost-5.96/E0004-2-RC");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = faker.lorem.word();
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = faker.lorem.paragraph(); 
    PostPage.writeContent(contenido);
    cy.screenshot("../../ghost-5.96/E0004-3-RC");

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
    cy.screenshot("../../ghost-5.96/E0004-4-RC");

    //And le de click en el post creado
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0004-5-RC");

    //And edita el contenido del post
    let contenidoEditado = faker.lorem.paragraph(20);
    PostPage.writeContent(contenidoEditado);
    cy.screenshot("../../ghost-5.96/E0004-6-RC");

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
    cy.screenshot("../../ghost-5.96/E0004-7-RC");
  });

  it("E00012 - Editar el contenido de un post previamente creado (Aleatorio)", function () {
    //Creamos semilla de faker
    faker.seed();
    let randomCategory = faker.helpers.arrayElement(Object.keys(categoryMethods));
    let randomMethod = faker.helpers.objectKey(faker[randomCategory]);
    let randomData = faker[randomCategory][randomMethod]();

    //Given que voy a la sección de posts
    PrincipalPage.clickPosts();
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0004-1-RC");

    //And el administrador ve la página de listado de posts
    PostPage.getTitleSection().should("include.text", "Posts");

    //And le da click en el boton New Post
    PostPage.clickNewPost();
    cy.screenshot("../../ghost-5.96/E0004-2-RC");

    //And el administrador ve la página de creación de post
    PostPage.creationPostPage().should("have.value", "");

    //And escribe el titulo del post
    let titulo = randomData;
    PostPage.writeTitle(titulo);

    //And escribe el contenido
    let contenido = faker.lorem.paragraph(); 
    PostPage.writeContent(contenido);
    cy.screenshot("../../ghost-5.96/E0004-3-RC");

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
    cy.screenshot("../../ghost-5.96/E0004-4-RC");

    //And le de click en el post creado
    PostPage.lastPostCreated(titulo, "click");
    cy.wait(1000);
    cy.screenshot("../../ghost-5.96/E0004-5-RC");

    //And edita el contenido del post
    let contenidoEditado = faker.lorem.paragraph();
    PostPage.writeContent(contenidoEditado);
    cy.screenshot("../../ghost-5.96/E0004-6-RC");

    //And le de click en el boton de update
    PostPage.updatePostButton();

    //And le de click en el boton de devolverse a la lista de posts
    PostPage.clickBackToPosts();
    cy.wait(1000);

    //When le de click en el post editado
    PostPage.lastPostCreated(titulo, "click");
  });
});

describe("Escenarios E00013 - E00015", function () {
    beforeEach(() => {
      cy.fixture("properties.json").then((data) => {
        //Vistamos sitio de Ghost
        cy.visit(data.baseURL);
  
        //Iniciamos sesion
        LogIn.logIn(data.email, data.password);
        LogIn.logInButton();
        cy.screenshot("../../ghost-5.96/E0001-0-RC");
        cy.wait(1000);
      });
    });
  
    it('E00013 - Eliminamos un post previamente creado (A-priori)', function () {
        //Given que voy a la sección de posts
        PrincipalPage.clickPosts();
        cy.screenshot('../../ghost-5.96/E0005-1-RC');

        //And el administrador ve la página de listado de posts
        PostPage.getTitleSection().should('include.text', 'Posts');

        //And le da click en el boton New Post
        PostPage.clickNewPost();
        cy.screenshot('../../ghost-5.96/E0005-2-RC');

        //And el administrador ve la página de creación de post
        PostPage.creationPostPage().should('have.value', '');

        //And escribe el titulo del post
        let titulo = dataPool[4].tituloPost;
        PostPage.writeTitle(titulo);

        //And escribe el contenido
        let contenido = dataPool[4].contenidoPost;
        PostPage.writeContent(contenido);
        cy.screenshot('../../ghost-5.96/E0005-3-RC');

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
        cy.screenshot('../../ghost-5.96/E0005-4-RC');

        //And le de click derecho en el post creado
        PostPage.lastPostCreated(titulo, 'rightClick');
        cy.screenshot('../../ghost-5.96/E0005-5-RC');

        //When le da click en el boton de delete
        PostPage.deletePost();

        //Then el post es eliminado
        PostPage.deletePostModal();
        cy.wait(1000);
        cy.screenshot('../../ghost-5.96/E0005-6-RC');
    });

    it('E00014 - Eliminamos un post previamente creado (Pseudo)', function () {
        //Creamos semilla de faker
        faker.seed(123);

        //Given que voy a la sección de posts
        PrincipalPage.clickPosts();
        cy.screenshot('../../ghost-5.96/E0005-1-RC');

        //And el administrador ve la página de listado de posts
        PostPage.getTitleSection().should('include.text', 'Posts');

        //And le da click en el boton New Post
        PostPage.clickNewPost();
        cy.screenshot('../../ghost-5.96/E0005-2-RC');

        //And el administrador ve la página de creación de post
        PostPage.creationPostPage().should('have.value', '');

        //And escribe el titulo del post
        let titulo = faker.lorem.word();
        PostPage.writeTitle(titulo);

        //And escribe el contenido
        let contenido = faker.lorem.paragraph();
        PostPage.writeContent(contenido);
        cy.screenshot('../../ghost-5.96/E0005-3-RC');

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
        cy.screenshot('../../ghost-5.96/E0005-4-RC');

        //And le de click derecho en el post creado
        PostPage.lastPostCreated(titulo, 'rightClick');
        cy.screenshot('../../ghost-5.96/E0005-5-RC');

        //When le da click en el boton de delete
        PostPage.deletePost();

        //Then el post es eliminado
        PostPage.deletePostModal();
        cy.wait(1000);
        cy.screenshot('../../ghost-5.96/E0005-6-RC');
    });

    it('E00015 - Eliminamos un post previamente creado (Aleatorio)', function () {
        //Creamos semilla de faker
        faker.seed();
        let randomCategory = faker.helpers.arrayElement(Object.keys(categoryMethods));
        let randomMethod = faker.helpers.objectKey(faker[randomCategory]);
        let randomData = faker[randomCategory][randomMethod]();

        //Given que voy a la sección de posts
        PrincipalPage.clickPosts();
        cy.screenshot('../../ghost-5.96/E0005-1-RC');

        //And el administrador ve la página de listado de posts
        PostPage.getTitleSection().should('include.text', 'Posts');

        //And le da click en el boton New Post
        PostPage.clickNewPost();
        cy.screenshot('../../ghost-5.96/E0005-2-RC');

        //And el administrador ve la página de creación de post
        PostPage.creationPostPage().should('have.value', '');

        //And escribe el titulo del post
        let titulo = randomData;
        PostPage.writeTitle(titulo);

        //And escribe el contenido
        let contenido = faker.lorem.paragraph();
        PostPage.writeContent(contenido);
        cy.screenshot('../../ghost-5.96/E0005-3-RC');

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
        cy.screenshot('../../ghost-5.96/E0005-4-RC');

        //And le de click derecho en el post creado
        PostPage.lastPostCreated(titulo, 'rightClick');
        cy.screenshot('../../ghost-5.96/E0005-5-RC');

        //When le da click en el boton de delete
        PostPage.deletePost();

        //Then el post es eliminado
        PostPage.deletePostModal();
        cy.wait(1000);
        cy.screenshot('../../ghost-5.96/E0005-6-RC');
    });
  });
