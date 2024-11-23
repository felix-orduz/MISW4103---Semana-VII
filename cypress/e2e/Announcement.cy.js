import { AnnouncementPage } from '../pages/version_rc/announcementPage';
import { faker } from "@faker-js/faker";

describe('Feature: El usuario admin puede editar el design.', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        AnnouncementPage.doLogIn();
    });

    it("Escenario 53: Editar subheader con datos a-priori generados con Mockaroo", () => {
        //Given usuario logueado
        AnnouncementPage.goToSettings();

        AnnouncementPage.getAnnouncementSection().within(() => {
            AnnouncementPage.clickCustomizeAnnouncement();
        });

        cy.wait(500);

        cy.fixture("announcement.data.apriori.json").then((data) => {
            let announcement = data[1].announcement;
            let aBackgroundColor = data[1].background_color;
            let aVisibility = data[1].visibility;

            AnnouncementPage.getAnnouncementInput()
                .clear();

            AnnouncementPage.getBackgroundColorButton(aBackgroundColor).click();
           
            AnnouncementPage.getVisibilityCheckbox(aVisibility) .click()
            AnnouncementPage.getAnnouncementInput()
                .type(announcement);

            cy.wait(500)

            AnnouncementPage.getSaveAnnouncementButton()
                .first().click();

            AnnouncementPage.goToSite();

            AnnouncementPage.getAnnouncementBarInSite()
                .should("contain", announcement)
                .and("have.class", aBackgroundColor.toLowerCase())
        });       
    });

    it("Escenario 54: Editar announcement con datos a-priori generados con Mockaroo con un texto superior a 200", () => {
         //Given usuario logueado
      AnnouncementPage.goToSettings();

      AnnouncementPage.getAnnouncementSection().within(() => {
          AnnouncementPage.clickCustomizeAnnouncement();
      });

        cy.wait(500);
        const visibilityOptions = ['visitors', 'free_members'];
        const bgColorOptions = ['Dark', 'Light', 'Accent'];
        let announcement = faker.lorem.sentence(5);
        // Selecciona elemento aleatorio
        let aBackgroundColor = bgColorOptions[faker.number.int({ min: 0, max: bgColorOptions.length - 1 })];
        let aVisibility = visibilityOptions[faker.number.int({ min: 0, max: visibilityOptions.length - 1 })];

        AnnouncementPage.getAnnouncementInput()
            .clear();

        AnnouncementPage.getBackgroundColorButton(aBackgroundColor).click();
        
        AnnouncementPage.getVisibilityCheckbox(aVisibility) .click()
        AnnouncementPage.getAnnouncementInput()
            .type(announcement);

        cy.wait(500)

        AnnouncementPage.getSaveAnnouncementButton()
            .first().click();

        AnnouncementPage.goToSite();

        AnnouncementPage.getAnnouncementBarInSite()
            .should("contain", announcement)
            .and("have.class", aBackgroundColor.toLowerCase())
       
    });
     
    });

    it("Escenario 55: Editar announcement con datos pseudo aleatorios generados online", () => {
       
       
    });

    it("Escenario 56: Editar announcement con datos aleatorios generados onlie", () => {
      //Given usuario logueado
      AnnouncementPage.goToSettings();

      AnnouncementPage.getAnnouncementSection().within(() => {
          AnnouncementPage.clickCustomizeAnnouncement();
      });

        cy.wait(500);
        const visibilityOptions = ['visitors', 'free_members'];
        const bgColorOptions = ['Dark', 'Light', 'Accent'];
        let announcement = faker.lorem.sentence();
        // Selecciona elemento aleatorio
        let aBackgroundColor = bgColorOptions[faker.number.int({ min: 0, max: bgColorOptions.length - 1 })];
        let aVisibility = visibilityOptions[faker.number.int({ min: 0, max: visibilityOptions.length - 1 })];

        AnnouncementPage.getAnnouncementInput()
            .clear();

        AnnouncementPage.getBackgroundColorButton(aBackgroundColor).click();
        
        AnnouncementPage.getVisibilityCheckbox(aVisibility) .click()
        AnnouncementPage.getAnnouncementInput()
            .type(announcement);

        cy.wait(500)

        AnnouncementPage.getSaveAnnouncementButton()
            .first().click();

        AnnouncementPage.goToSite();

        AnnouncementPage.getAnnouncementBarInSite()
            .should("contain", announcement)
            .and("have.class", aBackgroundColor.toLowerCase())
       
    });
});