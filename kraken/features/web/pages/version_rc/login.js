module.exports = {
    logIn: async function(driver, email, password) {
        let emailField = await driver.$('#identification');
        await emailField.setValue(email);

        let passwordField = await driver.$('#password');
        await passwordField.setValue(password);
    },

    logInButton: async function(driver) {
        let signInButton = await driver.$('#ember5');
        return signInButton.click({force: true});
    }
};