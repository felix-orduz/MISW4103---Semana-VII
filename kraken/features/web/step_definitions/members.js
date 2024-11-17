const { faker } = require("@faker-js/faker");
const fs = require("fs"); // Asegúrate de requerir 'fs' al principio del archivo
const { Given, When, Then, Before } = require("@cucumber/cucumber");

//Version base
const { writeFormMemberBase } = require("../pages/version_base/member");
const {
  clickNewMember,
  writeFormMember,
} = require("../pages/version_rc/member");
const { clickMembers } = require("../pages/version_rc/principal");

Then("Clic en la sección de Members", async function () {
  await clickMembers(this.driver);
});

Then("Clic en el botón de New Member", async function () {
  await clickNewMember(this.driver);
});

Then("Contenido del member base", async function () {

  let name = faker.person.fullName();
  let email = faker.internet.email();
  let note = faker.lorem.sentence();

  await writeFormMemberBase(this.driver, name, email, note);
});
