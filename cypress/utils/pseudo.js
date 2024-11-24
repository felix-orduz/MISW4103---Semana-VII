const properties = require("../fixtures/properties.json");

function getDataFromMockaroo() {
    const apiKey = Cypress.env("MOCKAROO_API_KEY");
    return  cy.request('GET', `https://my.api.mockaroo.com/announce.json?key=${properties.apiKey}`).as('data')
}

export default { getDataFromMockaroo };
