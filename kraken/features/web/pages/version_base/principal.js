module.exports = {
    clickPostsBS: async function (driver, url) {
        return await driver.url(url);
    },

    clickPages: async function (driver){
        let clicButton = await driver.$('[data-test-nav="pages"]');
        return clicButton.click({force: true});
    },

    clickTagsBS: async function (driver) {
        let clicButton = await driver.$('[href="#/tags/"]');
        return clicButton.click({force: true});
    },

    clickSitePage: async function (driver) {
        let clicButton = await driver.$('[data-test-nav="site"]');
        return clicButton.click({force: true});
    },

    clickMembersBase: async function (driver) {
        let clicButton = await driver.$('[href="#/members/"]');
        return clicButton.click({force: true});
    },

}
