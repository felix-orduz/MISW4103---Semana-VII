//Posts
require('./post.js');
require('./tags.js');
require('./principal.js');
require('./login.js');

const {
  writeFormMember,
  clickMemberByEmail,
  openMemberActions,
  verifyMemberDeleted
} = require("../pages/version_rc/member");

const fs = require('fs');
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

//Screenshots
Then('Tomo pantallazo BS {string}', async function (nombre) {
  await this.driver.saveScreenshot(`./screenshots/ghost-4.5/${nombre}`);
});

Then('Tomo pantallazo {string}', async function (nombre) {
  await this.driver.saveScreenshot(`./screenshots/ghost-5.96/${nombre}`);
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
