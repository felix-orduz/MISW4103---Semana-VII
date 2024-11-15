module.exports = {
    getTitlePostSectionBS: async function (driver) {
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

    clickNewPostBS: async function (driver) {
      let clicButton = await driver.$('[href="#/editor/post/"]');
      return clicButton.click({ force: true });
    },
    writeTitlePostBS: async function (driver, title) {
      let textField = await driver.$('.gh-editor-title.ember-text-area.gh-input.ember-view');
      await textField.setValue(title);
    },
    clickContentPostBS: async function (driver) {
      let contentField = await driver.$('[data-kg="editor"]');
      return contentField.click({ force: true });
    },
    writeContentPostBS: async function (driver, contenido) {
      let textField = await driver.$('[data-kg="editor"]');
      await textField.setValue(contenido);
    },
    clickNewPostPublishFinalBS: async function (driver) {
      let clicButton = await driver.$('.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view');
      return clicButton.click({ force: true });
    },
    clickNewPostContinueBS: async function (driver) {
      let clicButton = await driver.$('[data-test-button="continue"]');
      return clicButton.click({ force: true });
    },
    clickNewPostPublishBS: async function (driver) {
      let clicButton = await driver.$('.ember-view.ember-basic-dropdown-trigger.gh-btn.gh-btn-editor.gh-publishmenu-trigger');
      return clicButton.click({ force: true });
    },
    clickNewPostCloseModalBS: async function (driver) {
      let clicButton = await driver.$('[data-test-button="close-publish-flow"]');
      return clicButton.click({ force: true });
    },
    lastPostCreatedBS: async function (driver, title, flag) {
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

    viewContentBS: async function(driver, content) {
      const { expect } = await import('chai');
      let contentFieldElement = await driver.$('[data-kg="editor"]');
      let contentField = await contentFieldElement.getText();
      expect(contentField.trim()).to.include(content);
  },

    updatePostButtonBS: async function (driver) {
      let clic = await driver.$('.gh-publishmenu.ember-view');
      return clic.click({ force: true });
    },

    updatePostButtonFinalBS: async function(driver) {
      let clic = await driver.$('.gh-btn.gh-btn-black.gh-publishmenu-button.gh-btn-icon.ember-view');
      return clic.click({ force: true });
    },

    clickBackToPostsBS: async function (driver) {
      let clic = await driver.$('.gh-editor-back-button.ember-view');
      return clic.click({ force: true });
    },

    deletePostBS: async function (driver) {
      let clic = await driver.$('[data-test-button="delete"]');
      return clic.click({ force: true });
  },

    deletePostModalBS: async function (driver) {
      let clic = await driver.$('[data-test-button="confirm"]');
      return clic.click({ force: true });
  }

};
