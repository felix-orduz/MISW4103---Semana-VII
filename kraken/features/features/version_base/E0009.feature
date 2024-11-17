Feature: Ghost

@user9 @web
Scenario: E0009 - Crear un tag duplicado nombre y la descripción.
  Given I navigate to page principal BS
    And Tomo pantallazo BS "E0009-0-BS.png"
  And I enter email y password BS
  And I wait for 1 seconds
    And Tomo pantallazo BS "E0009-1-BS.png"
  And I clic to Sign in BS
  And Clic en la sección de Tags BS
  And Página de listado de tags BS
    And Tomo pantallazo BS "E0009-2-BS.png"
  And Clic en el boton New tag BS
  And Nombre del tag "New Tag1" BS
    And Tomo pantallazo BS "E0009-3-BS.png"
  And Clic en Descripción del tag BS
  And Descripción del tag "Contenido de tag1" BS
    And Tomo pantallazo BS "E0009-4-BS.png"
  And Clic en el boton guardar BS
    And Tomo pantallazo BS "E0009-5-BS.png"
  And Clic en la sección de Tags BS
  And Valida Tag publicado en la lista de tags "New Tag1" BS
    And Tomo pantallazo BS "E0009-6-BS.png"
  And Clic en el boton New tag BS
    And Tomo pantallazo BS "E0009-7-BS.png"
  And Nombre del tag "New Tag1" BS
    And Tomo pantallazo BS "E0009-8-BS.png"
  And Clic en Descripción del tag BS
  And Descripción del tag "Contenido de tag1" BS
    And Tomo pantallazo BS "E0009-9-BS.png"
  And Clic en el boton guardar BS
    And Tomo pantallazo BS "E0009-10-BS.png"
  Then Clic en la sección de Tags BS
    And Tomo pantallazo BS "E0009-11-BS.png"
  When Valida Tag publicado en la lista de tags "New Tag1" BS