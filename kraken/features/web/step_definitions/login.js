const fs = require('fs');
const { Given, When, Then, Before } = require('@cucumber/cucumber');

//Version rc
const { logIn, logInButton } = require("../pages/version_rc/login");

//Version base
const { logInBS, logInButtonBS } = require("../pages/version_base/login");

//Properties
let properties;
Before(() => {
  const data = fs.readFileSync('./features/web/properties.json', 'utf8');
  properties = JSON.parse(data);
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