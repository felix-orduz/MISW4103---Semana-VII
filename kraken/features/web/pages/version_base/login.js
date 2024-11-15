module.exports = {
    logInBS: async function(driver, email, password) {
        let emailField = await driver.$('.email.ember-text-field.gh-input.ember-view');
        await emailField.setValue(email);

        let passwordField = await driver.$('.password.ember-text-field.gh-input.ember-view');
        await passwordField.setValue(password);
    },

    logInButtonBS: async function(driver) {
        let signInButton = await driver.$('.login.gh-btn.gh-btn-login.gh-btn-block.gh-btn-icon.js-login-button.ember-view');
        return signInButton.click({force: true});
    }
};