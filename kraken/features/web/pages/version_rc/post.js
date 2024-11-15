module.exports = {
    getTitlePostSection: async function (driver) {
      let titleField = await driver.$("h2.gh-canvas-title");
      // Verificar que el texto del elemento contenga 'Posts'
      let text = await titleField.getText();
      if (text.includes("Posts")) {
        console.log('El título contiene "Posts".');
      } else {
        console.log('El título no contiene "Posts".');
      }
      return titleField.getText();
    },

    clickNewPost: async function (driver) {
      let clicButton = await driver.$('[data-test-new-post-button=""]');
      return clicButton.click({ force: true });
    },
    writeTitlePost: async function (driver, title) {
      let textField = await driver.$('[data-test-editor-title-input=""]');
      await textField.setValue(title);
    },
    clickContentPost: async function (driver) {
      let contentField = await driver.$('[data-kg="editor"]');
      return contentField.click({ force: true });
    },
    writeContentPost: async function (driver, contenido) {
      let textField = await driver.$('[data-kg="editor"]');
      await textField.setValue(contenido);
    },
    clickNewPostPublishFlow: async function (driver) {
      let clicButton = await driver.$('[data-test-button="publish-flow"]');
      return clicButton.click({ force: true });
    },
    clickNewPostContinue: async function (driver) {
      let clicButton = await driver.$('[data-test-button="continue"]');
      return clicButton.click({ force: true });
    },
    clickNewPostPublish: async function (driver) {
      let clicButton = await driver.$('[data-test-button="confirm-publish"]');
      return clicButton.click({ force: true });
    },
    clickNewPostCloseModal: async function (driver) {
      let clicButton = await driver.$('[data-test-button="close-publish-flow"]');
      return clicButton.click({ force: true });
    },
    lastPostCreated: async function (driver, title, flag) {
      const { expect } = await import('chai');
      let postTitleElement = await driver.$("h3.gh-content-entry-title");
      let postTitle = await postTitleElement.getText();

      if (flag === "notClick") {
        expect(postTitle).to.contain(title);
      } else if (flag === "click") {
        await postTitleElement.click({ force: true });
      } else {
        await postTitleElement.click({ button: "right", force: true });
      }
    },

    viewContent: async function(driver, content) {
      const { expect } = await import('chai');
      let contentFieldElement = await driver.$('[data-kg="editor"]');
      let contentField = await contentFieldElement.getText();
      expect(contentField.trim()).to.include(content);
  },

    updatePostButton: async function (driver) {
      let clic = await driver.$('[data-test-button="publish-save"]');
      return clic.click({ force: true });
    },

    clickBackToPosts: async function (driver) {
      let clic = await driver.$('[data-test-link="posts"]');
      return clic.click({ force: true });
    },

    deletePost: async function (driver) {
      let clic = await driver.$('[data-test-button="delete"]');
      return clic.click({ force: true });
  },

    deletePostModal: async function (driver) {
      let clic = await driver.$('[data-test-button="confirm"]');
      return clic.click({ force: true });
  }

};
