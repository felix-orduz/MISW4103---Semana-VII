const { faker } = require("@faker-js/faker");
const fs = require("fs"); // Asegúrate de requerir 'fs' al principio del archivo
const { Given, When, Then, Before } = require("@cucumber/cucumber");

//Version base
const {
  writeFormMemberBase,
  validateUpdatedMemberNameBase,
  clickDeleteMemberBase,
  clickNewMemberBase,
  clickSaveMemberBase,
  goToListMembersBase,
  clickMemberByEmailBase,
  updateMemberNameBase
} = require("../pages/version_base/member");
const {
  clickNewMember,
  writeFormMember,
  checkInvalidEmailError,
  checkLongNoteCharacterCount,
  updateMemberName,
  validateUpdatedMemberName,
  goToListMembers,
  clickMemberByEmail,
  clickDeleteMember,
  clickSaveMember,
  validateMemberInList
} = require("../pages/version_rc/member");
const { clickMembers } = require("../pages/version_rc/principal");
const { clickMembersBase } = require("../pages/version_base/principal");

Then("Clic en la sección de Members", async function () {
  await clickMembers(this.driver);
});

Then("Clic en la sección de Members Base", async function () {
  await clickMembersBase(this.driver);
});

Then("Clic en el botón de New Member", async function () {
  await clickNewMember(this.driver);
});

Then("Clic en el botón de New Member Base", async function () {
  await clickNewMemberBase(this.driver);
});

Then("Contenido del member base", async function () {
  const initialMemberData = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    note: faker.lorem.sentence(),
  };
  this.initialMemberData = initialMemberData;

  const createdEmail = initialMemberData.email;
  this.createEmail = createdEmail;
  let name = faker.person.fullName();
  let email = this.createEmail;
  let note = faker.lorem.sentence();

  await writeFormMemberBase(this.driver, name, email, note);
});

Then("Contenido de member con email inválido", async function () {
  const name = faker.person.fullName();
  const email = "invalid-email-format";
  const note = faker.lorem.sentence();
  await writeFormMemberBase(this.driver, name, email, note);
});

Then("Verifica mensaje de error de email inválido", async function () {
  await checkInvalidEmailError(this.driver);
});

Then("Contenido de member con email inválido y nota larga", async function () {
  const name = faker.person.fullName();
  const email = "invalid-email-format";
  const longNote = "a".repeat(501);
  await writeFormMemberBase(this.driver, name, email, longNote);
});

Then("Verifica contador de caracteres de nota", async function () {
  await checkLongNoteCharacterCount(this.driver);
});

Then("Contenido de member inicial", async function () {
  const initialMemberData = {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    note: faker.lorem.sentence(),
  };

  this.initialMemberData = initialMemberData;

  await writeFormMemberBase(
    this.driver,
    initialMemberData.name,
    initialMemberData.email,
    initialMemberData.note
  );
});

Then("Editar nombre del miembro", async function () {
  const updatedName = faker.person.fullName();
  this.updatedName = updatedName;
  await updateMemberName(this.driver, updatedName);
});

Then("Valida nombre del miembro actualizado Base", async function () {
  await validateUpdatedMemberNameBase(
    this.driver,
    this.initialMemberData.email,
    this.updatedName
  );
});

Then("clic en List Members", async function () {
  await goToListMembers(this.driver);
});

Then("Selecciona miembro por email", async function () {
  await clickMemberByEmail(this.driver, this.initialMemberData.email);
});

Then("Clic en Eliminar Miembro Base", async function () {
  await clickDeleteMemberBase(this.driver);
});

Then("Clic en Eliminar Miembro", async function () {
  await clickDeleteMember(this.driver);
});

Then("Clic en Save Member", async function () {
  await clickSaveMember(this.driver);
});

Then("Clic en Save Member Base", async function () {
  await clickSaveMemberBase(this.driver);
});

Then("clic en List Members Base", async function () {
  await goToListMembersBase(this.driver);
});

Then("Valida Member en lista", async function () {
  let email = "dasda1312@gmail121.com";
  await validateMemberInList(this.driver, email);
});

Then("Valida Member en lista Base", async function () {
  let email = this.createEmail;
  await validateMemberInList(this.driver, email);
});

Then("Selecciona miembro por email Base", async function () {
  console.log("Selecciona miembro por email Base", this.initialMemberData);
  await clickMemberByEmail(this.driver, this.initialMemberData.email);
});


Then("Editar nombre del miembro base", async function () {
  const updatedName = faker.person.fullName();
  this.initialMemberData.name = updatedName;
  this.updatedName = updatedName;
  await updateMemberNameBase(this.driver, updatedName);
});
