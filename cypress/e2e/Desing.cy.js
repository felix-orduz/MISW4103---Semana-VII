import { DesingPage } from '../pages/version_rc/designPage';
import { faker } from "@faker-js/faker";

describe('Feature: El usuario admin puede editar el design.', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        DesingPage.doLogIn();
    });

    it("Escenario 45: Editar subheader con datos a-priori generados con Mockaroo", () => {
        //Given usuario logueado
        DesingPage.goToSettings();

        DesingPage.goToEditDesign();

        cy.wait(500)

        cy.fixture("design.data.apriori.json").then((data) => {
            let siteDescription = data[5].site_description;
            let accentColor = data[5].accent_color;

            DesingPage.getSiteDescriptionInput()
                .clear();

            DesingPage.getSiteDescriptionInput()
                .type(siteDescription);

            DesingPage.getAccentColorInput()
                .type(accentColor);

            DesingPage.getSaveDesignButton()
                .click();

            cy.wait(500);

            DesingPage.goToSite();

            cy.get('footer.gh-footer.gh-outer').within(() => {
                cy.get('p.gh-footer-signup-subhead.is-body')
                    .should('contain', siteDescription);
            });
        });       
    });

    it("Escenario 46: Editar subheader con datos pseudo aleatorios generados onlie", () => {
        faker.seed(Date.now());
        //Given usuario logueado
        DesingPage.goToSettings();

        DesingPage.goToEditDesign();  
        
        let siteDescription = faker.lorem.sentence();
        let accentColor =  faker.color.rgb().slice(1);

        DesingPage.getSiteDescriptionInput()
            .clear();

        DesingPage.getSiteDescriptionInput()
            .type(siteDescription);

        DesingPage.getAccentColorInput()
            .type(accentColor);

        DesingPage.getSaveDesignButton()
            .click();

        cy.wait(500);

        DesingPage.goToSite();

        cy.get('footer.gh-footer.gh-outer').within(() => {
            cy.get('p.gh-footer-signup-subhead.is-body')
                .should('contain', siteDescription);
        });
       
    });

    it("Escenario 47: Editar subheader con datos aleatorios generados onlie", () => {
        //Given usuario logueado
        DesingPage.goToSettings();

        DesingPage.goToEditDesign();  
        
        let siteDescription = faker.lorem.sentence();
        let accentColor =  faker.color.rgb().slice(1);

        DesingPage.getSiteDescriptionInput()
            .clear();

        DesingPage.getSiteDescriptionInput()
            .type(siteDescription);

        DesingPage.getAccentColorInput()
            .type(accentColor);

        DesingPage.getSaveDesignButton()
            .click();

        cy.wait(500);

        DesingPage.goToSite();

        cy.get('footer.gh-footer.gh-outer').within(() => {
            cy.get('p.gh-footer-signup-subhead.is-body')
                .should('contain', siteDescription);
        });  
       
    });
});