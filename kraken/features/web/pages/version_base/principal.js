module.exports = {
    clickPostsBS: async function (driver, url) {
        return await driver.url(url);
    },

    clickPages: async function (driver){
        let clicButton = await driver.$('[data-test-nav="pages"]');
        return clicButton.click({force: true});
    },

    clickTags: async function (driver) {
        let clicButton = await driver.$('[data-test-nav="tags"]');
        return clicButton.click({force: true});
    },

    clickSitePage: async function (driver) {
        let clicButton = await driver.$('[data-test-nav="site"]');
        return clicButton.click({force: true});
    },

    clickMembers: async function (driver) {
        let clicButton = await driver.$('[data-test-nav="members"]');
        return clicButton.click({force: true});
    },

}
