const { Given, When, Then } = require('@cucumber/cucumber');
const { getTitlePostSection, clickNewPost,writeTitlePost, clickContentPost,
  writeContentPost,clickNewPostPublishFlow, clickNewPostContinue, clickNewPostPublish,
  clickNewPostCloseModal, lastPostCreated, viewContent, updatePostButton,
  clickBackToPosts, deletePost} = require('../pages/post');


const { clickNewMember, writeFormMember, clickSaveMember, goToListMembers, validateMemberInList } = require('../pages/member');
const { logIn, logInButton } = require('../pages/login');
const { getTitleAdmin, clickPosts, clickMembers } = require('../pages/principal');

//Seccion login
When('I enter email {string} password {string}', async function (email, password) {
    await logIn(this.driver, email, password);
});

Then('I clic to Sign in', async function () {
    await logInButton(this.driver);
});

//Principal
Then('Página principal del administrador', async function () {
  await getTitleAdmin(this.driver);
});

Then('Clic en la sección de Posts', async function () {
  await clickPosts(this.driver);
});

//Posts
Then('Página de listado de posts', async function () {
  await getTitlePostSection(this.driver);
});

Then('Clic en el boton New Post', async function () {
  await clickNewPost(this.driver);
});

Then('Titulo del post', async function () {
  let titulo = 'Titulo de prueba';
  await writeTitlePost(this.driver, titulo);
});

Then('Clic en Contenido', async function () {
  await clickContentPost(this.driver);
});

Then('Contenido del post', async function () {
  let contenido = "Contenido de prueba";
  await writeContentPost(this.driver, contenido);
});

Then('Clic en el boton publish-flow', async function () {
  await clickNewPostPublishFlow(this.driver);
});

Then('Clic en el boton Continue', async function () {
  await clickNewPostContinue(this.driver);
});

Then('Clic en el boton Publish Post', async function () {
  await clickNewPostPublish(this.driver);
});

Then('Cierre el modal de confirmación', async function () {
  await clickNewPostCloseModal(this.driver);
});

Then('Valida Post publicado en la lista de posts', async function () {
  let titulo = 'Titulo de prueba';
  await lastPostCreated(this.driver, titulo, "notClick");
});

Then('Entro al post creado', async function () {
  let titulo = 'Titulo de prueba';
  await lastPostCreated(this.driver, titulo, "click");
});

Then('Valido el contenido del post', async function () {
  let contenido = "Contenido de prueba";
  await viewContent(this.driver, contenido);
});

Then('Edito el titulo', async function () {
  let tituloEditado = 'Titulo de prueba editado';
  await writeTitlePost(this.driver, tituloEditado);
});

Then('Edito contenido del post', async function () {
  let contenidoEditado = "Contenido de prueba editado";
  await writeContentPost(this.driver, contenidoEditado);
});

Then('Clic en boton de Update', async function () {
  await updatePostButton(this.driver);
});

Then('Clic para devolverse a los posts', async function () {
  await clickBackToPosts(this.driver);
});

Then('Valida titulo del Post editado en la lista de posts', async function () {
  let tituloEditado = 'Titulo de prueba editado';
  await lastPostCreated(this.driver, tituloEditado, "notClick");
});

Then('Entro al post editado', async function () {
  let tituloEditado = 'Titulo de prueba editado';
  await lastPostCreated(this.driver, tituloEditado, "click");
});

Then('Valido el contenido del post editado', async function () {
  let contenidoEditado = "Contenido de prueba editado";
  await viewContent(this.driver, contenidoEditado);
});

Then('Clic derecho en el post creado', async function () {
  let titulo = 'Titulo de prueba';
  await lastPostCreated(this.driver, titulo, "rightClick");
});

Then('Elimino el post', async function () {
  await deletePost(this.driver);
});

Then('Clic en la sección de Members', async function () {
  await clickMembers(this.driver);
});

Then('Clic en el botón de New Member', async function () {
  await clickNewMember(this.driver);
});

Then('Contenido del member', async function () {
  let name = 'Nombre';
  let email = 'dasda1312@gmail121.com';
  let note = 'Nota de prueba';
  await writeFormMember(this.driver, name, email, note);
});

Then('Clic en Save Member', async function () {
  await clickSaveMember(this.driver);
});

Then('clic en List Members', async function () {
  await goToListMembers(this.driver);
});

Then('Valida Member en lista', async function () {
  let email = 'dasda1312@gmail121.com'; // Usa el mismo correo del miembro creado
  await validateMemberInList(this.driver, email);
});
