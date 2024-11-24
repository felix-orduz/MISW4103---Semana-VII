import { MetadataPage } from '../pages/version_rc/metadataPage';
import { faker } from "@faker-js/faker";

describe('Feature: El usuario admin puede editar la metadata del site.', () => {
    Cypress.on("uncaught:exception", (err, runnable) => {
        return false;
    });

    beforeEach(()=>{
        MetadataPage.doLogIn();
    });

    it("E000111: Editar meta Title y meta Description con datos a-priori generados con Mockaroo", () => {
        //Given usuario logueado
        MetadataPage.goToSettings();

        MetadataPage.goToEditMetadata();

        cy.wait(500);

        // And cargo datos apriori
        cy.fixture("metadata.data.apriori.json").then((data) => {
            let metaTitle = data[0].meta_title;

            MetadataPage.getMetadataSection()
                .within(() => {
                    cy.contains('Edit').click()
                });

            // When Cambio el meta titulo
            MetadataPage.getMetadataSection().within(() => {
                cy.contains('Meta title')
                    .get('input')
                    .first()
                    .clear()
                    .type(metaTitle);

                //And guardo cambios
                MetadataPage.getSaveMetadataButton()
                    .contains('Save')
                    .click();
            });


            cy.wait(500); 
            // Then
            MetadataPage.getMetadataSection().within(() => {
                MetadataPage.getMetadataPreview()
                    .should('contain', metaTitle)
            });
            
        });       
    });

    it("E000112: Editar subheader con datos pseudo aleatorios generados onlie", () => {
 //Given usuario logueado
 MetadataPage.goToSettings();

 MetadataPage.goToEditMetadata();

 cy.wait(500)
 // And cargo datos pseudo aleatorios desde mockaroo
 cy.get('@data').then(response => {
    let metaTitle = response.body[0].page_title;
    
     MetadataPage.getMetadataSection()
         .within(() => {
             cy.contains('Edit').click()
         });
     // When Cambio el meta titulo
     MetadataPage.getMetadataSection().within(() => {
         cy.contains('Meta title')
             .get('input')
             .first()
             .clear()
             .type(metaTitle);

         // And guardio los cambios
         MetadataPage.getSaveMetadataButton()
             .contains('Save')
             .click();
     });

     cy.wait(500); 
     // Then verifico que exita
     MetadataPage.getMetadataSection().within(() => {
         MetadataPage.getMetadataPreview()
             .should('contain', metaTitle)
     });
     
 });       
       
    });

    it("E000113: Editar meta Title y meta Description con datos aleatorios generados onlie", () => {
        //Given usuario logueado
        MetadataPage.goToSettings();

        MetadataPage.goToEditMetadata();

        cy.wait(500)
        // And generodatos aleatorios 
        let metaTitle = faker.lorem.sentence();
        let metaDescription = faker.lorem.sentence();

        MetadataPage.getMetadataSection()
            .within(() => {
                cy.contains('Edit').click()
            });
        // When Cambio el meta titulo
        MetadataPage.getMetadataSection().within(() => {
            cy.contains('Meta title')
                .get('input')
                .first()
                .clear()
                .type(metaTitle);

            // And guardio los cambios
            MetadataPage.getSaveMetadataButton()
                .contains('Save')
                .click();
        });

        cy.wait(500); 
        // Then verifico que exita
        MetadataPage.getMetadataSection().within(() => {
            MetadataPage.getMetadataPreview()
                .should('contain', metaTitle)
        });
            
       
    });

    it("E000114: Editar meta Title con datos a-priori generados con Mockaroo y una longitud superior a 70 characters", () => {
        //Given usuario logueado
        MetadataPage.goToSettings();

        MetadataPage.goToEditMetadata();

        cy.wait(500)

        cy.fixture("metadata.data.apriori.json").then((data) => {
            let metaTitle = data[4].meta_title;
            let metaDescription = data[4].meta_description;

            MetadataPage.getMetadataSection()
                .within(() => {
                    cy.contains('Edit').click()
                });

            MetadataPage.getMetadataSection().within(() => {
                cy.contains('Meta title')
                    .get('input')
                    .first()
                    .clear()
                    .type(metaTitle);

                //cy.contains('Meta description').get('input').type(metaDescription);

                MetadataPage.getSaveMetadataButton()
                    .contains('Save')
                    .click();
            });


            cy.wait(500); 
            
            MetadataPage.getMetadataSection().within(() => {
                MetadataPage.getMetadataPreview()
                    .should('contain', metaTitle)
            });
            
        });       
    });
});