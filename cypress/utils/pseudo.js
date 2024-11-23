function getDataFromMockaroo() {
    return  cy.request('GET', `https://my.api.mockaroo.com/announce.json?key=`).as('data')
}

export default { getDataFromMockaroo };