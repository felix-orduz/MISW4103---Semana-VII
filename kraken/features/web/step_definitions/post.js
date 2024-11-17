const fs = require('fs'); // Asegúrate de requerir 'fs' al principio del archivo
const { Given, When, Then, Before } = require('@cucumber/cucumber');

//Version base
const {
    getTitlePostSectionBS,
    clickNewPostBS,
    writeTitlePostBS,
    clickContentPostBS,
    writeContentPostBS,
    clickNewPostPublishFinalBS,
    clickNewPostContinueBS,
    clickNewPostPublishBS,
    clickNewPostCloseModalBS,
    lastPostCreatedBS,
    viewContentBS,
    updatePostButtonBS,
    updatePostButtonFinalBS,
    clickBackToPostsBS,
    deletePostBS,
    deletePostModalBS,
  } = require("../pages/version_base/post");

//Version rc
const {
    getTitlePostSection,
    clickNewPost,
    writeTitlePost,
    clickContentPost,
    writeContentPost,
    clickNewPostPublishFlow,
    clickNewPostContinue,
    clickNewPostPublish,
    clickNewPostCloseModal,
    lastPostCreated,
    viewContent,
    updatePostButton,
    clickBackToPosts,
    deletePost,
    deletePostModal,
  } = require("../pages/version_rc/post");

//Posts version base
Then("Página de listado de posts BS", async function () {
    await getTitlePostSectionBS(this.driver);
  });
  
  Then("Clic en el boton New Post BS", async function () {
    await clickNewPostBS(this.driver);
  });
  
  Then("Titulo del post BS", async function () {
    let titulo = "Titulo de prueba";
    await writeTitlePostBS(this.driver, titulo);
  });
  
  Then("Clic en Contenido post BS", async function () {
    await clickContentPostBS(this.driver);
  });
  
  Then("Contenido del post BS", async function () {
    let contenido = "Contenido de prueba";
    await writeContentPostBS(this.driver, contenido);
  });
  
  Then("Clic en el boton publish final BS", async function () {
    await clickNewPostPublishFinalBS(this.driver);
  });
  
  Then("Clic en el boton Continue post BS", async function () {
    await clickNewPostContinueBS(this.driver);
  });
  
  Then("Clic en el boton Publish Post BS", async function () {
    await clickNewPostPublishBS(this.driver);
  });
  
  Then("Cierre el modal de confirmación post BS", async function () {
    await clickNewPostCloseModalBS(this.driver);
  });
  
  Then("Valida Post publicado en la lista de posts BS", async function () {
    let titulo = "Titulo de prueba";
    await lastPostCreatedBS(this.driver, titulo, "notClick");
  });
  
  Then("Entro al post creado BS", async function () {
    let titulo = "Titulo de prueba";
    await lastPostCreatedBS(this.driver, titulo, "click");
  });
  
  Then("Valido el contenido del post BS", async function () {
    let contenido = "Contenido de prueba";
    await viewContentBS(this.driver, contenido);
  });
  
  Then("Edito el titulo del post BS", async function () {
    let tituloEditado = "Titulo de prueba editado";
    await writeTitlePostBS(this.driver, tituloEditado);
  });
  
  Then("Edito contenido del post BS", async function () {
    let contenidoEditado = "Contenido de prueba editado";
    await writeContentPostBS(this.driver, contenidoEditado);
  });
  
  Then("Clic en boton de Update del post BS", async function () {
    await updatePostButtonBS(this.driver);
  });
  
  Then('Clic en boton Update del post final BS', async function () {
    await updatePostButtonFinalBS(this.driver);
  });
  
  Then("Clic para devolverse a los posts BS", async function () {
    await clickBackToPostsBS(this.driver);
  });
  
  Then("Valida titulo del Post editado en la lista de posts BS", async function () {
    let tituloEditado = "Titulo de prueba editado";
    await lastPostCreatedBS(this.driver, tituloEditado, "notClick");
  });
  
  Then("Entro al post editado BS", async function () {
    let tituloEditado = "Titulo de prueba editado";
    await lastPostCreatedBS(this.driver, tituloEditado, "click");
  });
  
  Then("Valido el contenido del post editado BS", async function () {
    let contenidoEditado = "Contenido de prueba editado";
    await viewContentBS(this.driver, contenidoEditado);
  });
  
  Then("Clic derecho en el post creado BS", async function () {
    let titulo = "Titulo de prueba";
    await lastPostCreatedBS(this.driver, titulo, "rightClick");
  });
  
  Then("Clic en Elimino el post BS", async function () {
    await deletePostBS(this.driver);
  });
  
  Then('Elimino post BS', async function () {
    await deletePostModalBS(this.driver);
  });
  
  //Posts version rc
  Then("Página de listado de posts", async function () {
    await getTitlePostSection(this.driver);
  });
  
  Then("Clic en el boton New Post", async function () {
    await clickNewPost(this.driver);
  });
  
  Then("Titulo del post", async function () {
    let titulo = "Titulo de prueba";
    await writeTitlePost(this.driver, titulo);
  });
  
  Then("Clic en Contenido post", async function () {
    await clickContentPost(this.driver);
  });
  
  Then("Contenido del post", async function () {
    let contenido = "Contenido de prueba";
    await writeContentPost(this.driver, contenido);
  });
  
  Then("Clic en el boton publish-flow", async function () {
    await clickNewPostPublishFlow(this.driver);
  });
  
  Then("Clic en el boton Continue post", async function () {
    await clickNewPostContinue(this.driver);
  });
  
  Then("Clic en el boton Publish Post", async function () {
    await clickNewPostPublish(this.driver);
  });
  
  Then("Cierre el modal de confirmación post", async function () {
    await clickNewPostCloseModal(this.driver);
  });
  
  Then("Valida Post publicado en la lista de posts", async function () {
    let titulo = "Titulo de prueba";
    await lastPostCreated(this.driver, titulo, "notClick");
  });
  
  Then("Entro al post creado", async function () {
    let titulo = "Titulo de prueba";
    await lastPostCreated(this.driver, titulo, "click");
  });
  
  Then("Valido el contenido del post", async function () {
    let contenido = "Contenido de prueba";
    await viewContent(this.driver, contenido);
  });
  
  Then("Edito el titulo del post", async function () {
    let tituloEditado = "Titulo de prueba editado";
    await writeTitlePost(this.driver, tituloEditado);
  });
  
  Then("Edito contenido del post", async function () {
    let contenidoEditado = "Contenido de prueba editado";
    await writeContentPost(this.driver, contenidoEditado);
  });
  
  Then("Clic en boton de Update del post", async function () {
    await updatePostButton(this.driver);
  });
  
  Then("Clic para devolverse a los posts", async function () {
    await clickBackToPosts(this.driver);
  });
  
  Then("Valida titulo del Post editado en la lista de posts", async function () {
    let tituloEditado = "Titulo de prueba editado";
    await lastPostCreated(this.driver, tituloEditado, "notClick");
  });
  
  Then("Entro al post editado", async function () {
    let tituloEditado = "Titulo de prueba editado";
    await lastPostCreated(this.driver, tituloEditado, "click");
  });
  
  Then("Valido el contenido del post editado", async function () {
    let contenidoEditado = "Contenido de prueba editado";
    await viewContent(this.driver, contenidoEditado);
  });
  
  Then("Clic derecho en el post creado", async function () {
    let titulo = "Titulo de prueba";
    await lastPostCreated(this.driver, titulo, "rightClick");
  });
  
  Then("Clic en Elimino el post", async function () {
    await deletePost(this.driver);
  });
  
  Then('Elimino post', async function () {
    await deletePostModal(this.driver);
  });