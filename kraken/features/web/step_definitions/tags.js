const fs = require('fs'); // Asegúrate de requerir 'fs' al principio del archivo
const { Given, When, Then, Before } = require('@cucumber/cucumber');
//---------------------------------------------------------------------------------------------------------------------------
//Tags
//Version base
const { getTitleTagSectionBS, clickNewTagBS, writeNameTagBS, clickNombreTagBS,
    clickDescriptionTagBS, writeDescriptionTagBS, clickNewTagSaveBS, clickDeleteTagBS, clickDeleteConfirmTagBS, lastTagCreatedBS, clicTagBS, clickNewTagValidateBS } = require('../pages/version_base/tag');

  Then('Página de listado de tags BS', async function () {
    await getTitleTagSectionBS(this.driver);
   });
   
   Then('Clic en el boton New tag BS', async function () {
    await clickNewTagBS(this.driver);
   });
   
   Then('Clic en el boton Eliminar BS', async function () {
    await clickDeleteTagBS(this.driver);
   });
   
   Then('Clic en el boton Confirmar Eliminar BS', async function () {
    await clickDeleteConfirmTagBS(this.driver);
   });
   
   When('Nombre del tag {string} BS', async function (name) {
    await writeNameTagBS(this.driver, name);
   });
   
   When('Nombre del tag con caracteres especiales {string} BS', async function (name) {
    await writeNameTagBS(this.driver, name);
   });
   
   Then('Clic en Descripción del tag BS', async function () {
    await clickDescriptionTagBS(this.driver);
   });
   
   When('Descripción del tag {string} BS', async function (description) {
    await writeDescriptionTagBS(this.driver, description);
   });
   
   Then('Clic en el boton guardar BS', async function () {
    await clickNewTagSaveBS(this.driver);
   });
   
   When('Valida Tag publicado en la lista de tags {string} BS', async function (name) {
    await lastTagCreatedBS(this.driver, name, "notClick");
   });
   
   When('Clic en el tag {string} BS', async function (name) {
    await clicTagBS(this.driver, name);
   });
   
   Then('Clic en el input nombre tag BS', async function () {
     await clickNombreTagBS(this.driver);
   });
  
   //Version rc
   const { getTitleTagSection, clickNewTag, writeNameTag, clickNombreTag,
    clickDescriptionTag, writeDescriptionTag, clickNewTagSave, clickDeleteTag, clickDeleteConfirmTag, lastTagCreated, clicTag, clickNewTagValidate } = require('../pages/version_rc/tag');
  
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
  
  //---------------------------------------------------------------------------------------------------------------------------
  //EndTags 