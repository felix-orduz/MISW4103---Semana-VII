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
            AnnouncementPage.getAnnouncementInput()
                .type(announcement);

            AnnouncementPage.getBackgroundColorButton(aBackgroundColor).click();
           
            AnnouncementPage.getVisibilityCheckbox(aVisibility) .click()
            
        });       
    });

    it("Escenario 54: Editar subheader con datos a-priori generados con Mockaroo con un subheader superior a 200", () => {

     
    });

    it("Escenario 55: Editar subheader con datos pseudo aleatorios generados onlie", () => {
       
       
    });

    it("Escenario 56: Editar subheader con datos aleatorios generados onlie", () => {
        
       
    });
});