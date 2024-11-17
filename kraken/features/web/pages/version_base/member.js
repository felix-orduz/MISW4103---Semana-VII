module.exports = {
  writeFormMemberBase: async function (driver, name, email, note) {


    let textNameField = await driver.$("input#member-name");
    let textEmailField = await driver.$("input#member-email");
    let textNoteField = await driver.$("textarea#member-note");

    await textNameField.setValue(name);
    await textEmailField.setValue(email);
    await textNoteField.setValue(note);
  },
};
