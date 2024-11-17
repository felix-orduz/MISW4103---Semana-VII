const { Given, When, Then, Before } = require("@cucumber/cucumber");
const fs = require("fs");

let properties;
Before(() => {
  const data = fs.readFileSync('./features/web/properties.json', 'utf8');
  properties = JSON.parse(data);
});

//Version base
const { clickTagsBS } = require("../pages/version_base/principal");

//Version rc
const {
  clickPosts,
  clickMembers,
  clickTags,
  clickPages,
} = require("../pages/version_rc/principal");

//Principal base
Then("Clic en la sección de Posts BS", async function () {
  await this.driver.url(properties.postsURL);
});

Then("Clic en la sección de Tags BS", async function () {
  await clickTagsBS(this.driver);
});

//Principal rc
Then("Página principal del administrador", async function () {
  await getTitleAdmin(this.driver);
});

Then("Clic en la sección de Posts", async function () {
  await clickPosts(this.driver);
});

Then("Click en la sección de Pages", async function () {
  await clickPages(this.driver);
});

Then("Clic en la sección de Tags", async function () {
  await clickTags(this.driver);
});
