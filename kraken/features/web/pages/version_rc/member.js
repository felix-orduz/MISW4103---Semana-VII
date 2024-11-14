module.exports = {
  clickNewMember: async function (driver) {
    let clicButton = await driver.$('[data-test-new-member-button="true"]');
    return clicButton.click({ force: true });
  },

  writeFormMember: async function (driver, name, email, note) {
    let textNameField = await driver.$('[data-test-input="member-name"]');
    let textEmailField = await driver.$('[data-test-input="member-email"]');
    let textNoteField = await driver.$('[data-test-input="member-note"]');

    await textNameField.setValue(name);
    await textEmailField.setValue(email);
    await textNoteField.setValue(note);
  },

  clickSaveMember: async function (driver) {
    let saveButton = await driver.$('button[data-test-button="save"]');
    return saveButton.click();
  },

  goToListMembers: async function (driver) {
    let backToListButton = await driver.$('[data-test-link="members-back"]');
    return backToListButton.click();
  },

  validateMemberInList: async function (driver, email) {
    let memberEmails = await driver.$$(`p.gh-members-list-email`);

    for (const element of memberEmails) {
      let text = await element.getText();
      if (text.trim() === email) {
        return true;
      }
    }
    return false;
  },

  validateMemberInList: async function (driver, email) {
    const { expect } = await import("chai"); // Importa expect de chai dentro de la función
    let memberEmails = await driver.$$(`p.gh-members-list-email`);

    let emailFound = false;
    for (const element of memberEmails) {
      let text = await element.getText();
      if (text.trim() === email) {
        emailFound = true;
        break;
      }
    }

    expect(emailFound).to.be.true;
  },

  writeInvalidFormMember: async function (driver, name, email, note) {
    let textNameField = await driver.$('[data-test-input="member-name"]');
    let textEmailField = await driver.$('[data-test-input="member-email"]');
    let textNoteField = await driver.$('[data-test-input="member-note"]');

    await textNameField.setValue(name);
    await textEmailField.setValue(email);
    await textNoteField.setValue(note);
  },

  checkInvalidEmailError: async function (driver) {
    const { expect } = await import("chai");

    let errorMessageElement = await driver.$("input#member-email + p.response");

    let isDisplayed = await errorMessageElement.isDisplayed();
    if (!isDisplayed) {
      throw new Error("El mensaje de error no está visible en la página.");
    }

    let errorMessageText = await errorMessageElement.getText();

    console.log("Texto del mensaje de error:", errorMessageText);

    expect(errorMessageText.trim()).to.include("Invalid Email.");
  },

  checkLongNoteCharacterCount: async function (driver) {
    const { expect } = await import("chai");
    let wordCountElement = await driver.$("span.word-count");

    let color = await wordCountElement.getCSSProperty("color");
    expect(color.parsed.hex).to.equal("#e25440");

    let charCountText = await wordCountElement.getText();
    let charCount = parseInt(charCountText.trim());
    expect(charCount).to.be.greaterThan(500);
  },

  clickMemberByEmail: async function (driver, email) {
    const memberEmailElement = await driver.$(
      `p.gh-members-list-email=${email}`
    );
    await memberEmailElement.click();
  },

  updateMemberName: async function (driver, updatedName) {
    const nameField = await driver.$('input[data-test-input="member-name"]');
    await nameField.clearValue();
    await nameField.setValue(updatedName);
  },

  validateUpdatedMemberName: async function (driver, email, updatedName) {
    const { expect } = await import("chai");
    const memberEmailElement = await driver.$(
      `p.gh-members-list-email=${email}`
    );
    const parentElement = await memberEmailElement.parentElement();
    const nameElement = await parentElement.$("h3.gh-members-list-name");
    const nameText = await nameElement.getText();
    expect(nameText.trim()).to.equal(updatedName);
  },

  openMemberActions: async function (driver) {
    let actionsButton = await driver.$(
      'button[data-test-button="member-actions"]'
    );
    return actionsButton.click();
  },

  clickDeleteMember: async function (driver) {
    let deleteButton = await driver.$(
      'button[data-test-button="delete-member"]'
    );
    return deleteButton.click();
  },

  confirmDeleteMember: async function (driver) {
    let confirmButton = await driver.$('button[data-test-button="confirm"]');
    return confirmButton.click();
  },

  getMembersList: async function (driver) {
    let memberElements = await driver.$$(`p.gh-members-list-email`);
    return Promise.all(
      memberElements.map(async (element) => {
        const email = await element.getText();
        return { email: email.trim() };
      })
    );
  },
  verifyMemberDeleted: async function (driver, email) {
    const { expect } = await import("chai");
    const membersList = await module.exports.getMembersList(driver);

    // Busca al miembro en la lista usando el email
    const member = membersList.find((m) => m.email === email);

    // Verifica que el miembro no esté en la lista
    expect(member).to.be.undefined;
  },

};
