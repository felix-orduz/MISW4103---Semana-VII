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

const { logInBS, logInButtonBS } = require("../pages/version_base/login");
const {
  clickPostsBS,
} = require("../pages/version_base/principal");

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

const { getTitleTagSection, clickNewTag, writeNameTag, clickNombreTag,
  clickDescriptionTag, writeDescriptionTag, clickNewTagSave, clickDeleteTag, clickDeleteConfirmTag, lastTagCreated, clicTag, clickNewTagValidate } = require('../pages/version_rc/tag');

const {
  clickNewMember,
  writeFormMember,
  clickSaveMember,
  goToListMembers,
  validateMemberInList,
  writeInvalidFormMember,
  checkInvalidEmailError,
  checkLongNoteCharacterCount,
  clickMemberByEmail,
  updateMemberName,
  validateUpdatedMemberName,
  openMemberActions,
  clickDeleteMember,
  confirmDeleteMember,
  verifyMemberDeleted
} = require("../pages/version_rc/member");

const { logIn, logInButton } = require("../pages/version_rc/login");
const {
  clickPosts,
  clickMembers,
  clickTags,
  clickPages
} = require("../pages/version_rc/principal");

const fs = require('fs'); // Asegúrate de requerir 'fs' al principio del archivo
const { Given, When, Then, Before } = require('@cucumber/cucumber');

let properties;
Before(() => {
  const data = fs.readFileSync('./features/web/properties.json', 'utf8');
  properties = JSON.parse(data);
});

Given('I navigate to page principal', async function () {
    await this.driver.url(properties.Url);
});

Given('I navigate to page principal BS', async function () {
  await this.driver.url(properties.Url);
});

//Seccion login rc
When('I enter email y password', async function () {
    await logIn(this.driver, properties.Email, properties.Password);
});

Then("I clic to Sign in", async function () {
  await logInButton(this.driver);
});

//Seccion login base
When('I enter email y password BS', async function () {
  await logInBS(this.driver, properties.Email, properties.Password);
});

Then("I clic to Sign in BS", async function () {
await logInButtonBS(this.driver);
});

//Principal base
Then("Clic en la sección de Posts BS", async function () {
  await clickPostsBS(this.driver);
});

//Principal rc
Then("Página principal del administrador", async function () {
  await getTitleAdmin(this.driver);
});

Then("Clic en la sección de Posts", async function () {
  await clickPosts(this.driver);
});

Then('Click en la sección de Pages', async function () {
  await clickPages(this.driver);
});

Then('Clic en la sección de Tags', async function () {
  await clickTags(this.driver);
});

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

//Tags
Then('Página de listado de tags', async function () {
 await getTitleTagSection(this.driver);
});

Then('Clic en el boton New tag', async function () {
 await clickNewTag(this.driver);
});

Then('Clic en el boton Eliminar', async function () {
 await clickDeleteTag(this.driver);
});

Then('Clic en el boton Confirmar Eliminar', async function () {
 await clickDeleteConfirmTag(this.driver);
});

When('Nombre del tag {string}', async function (name) {
 await writeNameTag(this.driver, name);
});

When('Nombre del tag con caracteres especiales {string}', async function (name) {
 await writeNameTag(this.driver, name);
});

Then('Clic en Descripción del tag', async function () {
 await clickDescriptionTag(this.driver);
});

When('Descripción del tag {string}', async function (description) {
 await writeDescriptionTag(this.driver, description);
});

Then('Clic en el boton guardar', async function () {
 await clickNewTagSave(this.driver);
});

When('Valida Tag publicado en la lista de tags {string}', async function (name) {
 await lastTagCreated(this.driver, name, "notClick");
});

When('Clic en el tag {string}', async function (name) {
 await clicTag(this.driver, name);
});

Then('Clic en el input nombre tag', async function () {
  await clickNombreTag(this.driver);
});

Then("Clic en la sección de Members", async function () {
  await clickMembers(this.driver);
});

Then("Clic en el botón de New Member", async function () {
  await clickNewMember(this.driver);
});

Then("Contenido del member", async function () {
  let name = "Nombre";
  let email = "dasda1312@gmail121.com";
  let note = "Nota de prueba";
  await writeFormMember(this.driver, name, email, note);
});

Then("Clic en Save Member", async function () {
  await clickSaveMember(this.driver);
});

Then("clic en List Members", async function () {
  await goToListMembers(this.driver);
});

Then("Valida Member en lista", async function () {
  let email = "dasda1312@gmail121.com";
  await validateMemberInList(this.driver, email);
});

Then("Contenido de member con email inválido", async function () {
  const name = "Nombre";
  const email = "invalid-email-format";
  const note = "Nota de prueba";
  await writeInvalidFormMember(this.driver, name, email, note);
});

Then("Verifica mensaje de error de email inválido", async function () {
  await checkInvalidEmailError(this.driver);
});


Then("Contenido de member con email inválido y nota larga", async function () {
  const name = "Nombre Inválido";
  const email = "invalid-email-format"; // Email inválido
  const longNote = "a".repeat(501); // Genera una nota de más de 500 caracteres
  await writeFormMember(this.driver, name, email, longNote);
});


Then("Verifica contador de caracteres de nota", async function () {
  await checkLongNoteCharacterCount(this.driver);
});

Then("Selecciona miembro por email", async function () {
  await clickMemberByEmail(this.driver, this.initialMemberData.email);
});

Then("Editar nombre del miembro", async function () {
  const updatedName = "New Name";
  this.updatedName = updatedName;
  await updateMemberName(this.driver, updatedName);
});

Then("Valida nombre del miembro actualizado", async function () {
  await validateUpdatedMemberName(this.driver, this.initialMemberData.email, this.updatedName);
});

Then("Contenido de member inicial", async function () {
  const initialMemberData = {
    name: "Test Edit Name",
    email: "dasda1312@gmail1212.com",
    note: "note",
  };
  this.initialMemberData = initialMemberData;
  await writeFormMember(this.driver, initialMemberData.name, initialMemberData.email, initialMemberData.note);
});


Then("Contenido de member para eliminar", async function () {
  const memberData = {
    name: "Nombre de Ejemplo",
    email: "dasda1313@correo.com",
    note: "Nota de ejemplo",
  };
  await writeFormMember(this.driver, memberData.name, memberData.email, memberData.note);
});

Then("Selecciona Member para editar", async function () {
  await clickMemberByEmail(this.driver, "dasda1313@correo.com");
});

Then("Abre menú de acciones del miembro", async function () {
  await openMemberActions(this.driver);
});

Then("Clic en Eliminar Miembro", async function () {
  await clickDeleteMember(this.driver);
});

Then("Confirma eliminación de Miembro", async function () {
  await confirmDeleteMember(this.driver);
});

Then("Verifica Miembro eliminado en la lista", async function () {
  await verifyMemberDeleted(this.driver, "dasda1313@correo.com");
});

// ---------
// = Pages =
// ---------
const {
  getTitlePageSection,
  clickNewPage,
  writeTitlePage,
  writeContentPage,
  clickNewPagePublishFlow,
  clickNewPageContinue,
  clickNewPagePublish,
  clickNewPageCloseModal,
  clickContentPage,
  lastPageCreated,
  clickBackToPages,
  deletePage,
  clickPageUnPublish,
  clickPageRevertToDraft
} = require('../pages/version_rc/page');
Then('Página de listado de Pages', async function () {
  await getTitlePageSection(this.driver);
});

Then('Click en el boton New Page', async function () {
  await clickNewPage(this.driver);
});

Then('Titulo del page', async function () {
  let titulo = 'Titulo de prueba';
  await writeTitlePage(this.driver, titulo);
});

Then('Titulo vacio de la Page', async function () {
  let titulo = '';
  await writeTitlePage(this.driver, titulo);
});

Then('Clic en Contenido page', async function () {
  await clickContentPage(this.driver);
});

Then('Contenido del Page', async function () {
  let contenido = "Contenido de prueba para page";
  await writeContentPage(this.driver, contenido);
});

Then('Contenido vacio de la Page', async function () {
  let contenido = "";
  await writeContentPage(this.driver, contenido);
});


Then('Clic en el boton publish-flow page', async function () {
  await clickNewPagePublishFlow(this.driver);
});

Then('Clic en el boton Continue page', async function () {
  await clickNewPageContinue(this.driver);
});

Then('Clic en el boton Publish Page', async function () {
  await clickNewPagePublish(this.driver);
});

Then('Click en el boton UnPublish Page', async function () {
  await clickPageUnPublish(this.driver);
});

Then('Click en el boton revert to draft Page', async function () {
  await clickPageRevertToDraft(this.driver);
});

Then('Cierre el modal de confirmación page', async function () {
  await clickNewPageCloseModal(this.driver);
});

Then('Valida Page publicado en la lista de Pages', async function () {
  let titulo = 'Titulo de prueba';
  await lastPageCreated(this.driver, titulo, "notClick");
});

Then('Entro a la Page creada', async function () {
  let titulo = 'Titulo de prueba';
  await lastPageCreated(this.driver, titulo, "click");
});

Then('Edito el titulo de la Page', async function () {
  let tituloEditado = 'Titulo de prueba editado';
  await writeTitlePage(this.driver, tituloEditado);
});

Then('Clic para devolverse a las Pages', async function () {
  await clickBackToPages(this.driver);
});

Then('Valida titulo del Page editado en la lista de Pages', async function () {
  let tituloEditado = 'Titulo de prueba editado';
  await lastPostCreated(this.driver, tituloEditado, "notClick");
});

Then('Entro al post editado', async function () {
  let tituloEditado = 'Titulo de prueba editado';
  await lastPostCreated(this.driver, tituloEditado, "click");
});

Then('Clic derecho en la Page creada', async function () {
  let titulo = 'Titulo de prueba';
  await lastPageCreated(this.driver, titulo, "rightClick");
});

Then('Elimino la Page', async function () {
  await deletePage(this.driver);
});
