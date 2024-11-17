Feature: Ghost

@user6 @web
Scenario: E0006 - Crear un tag con nombre y descripción
  Given I navigate to page principal BS
    And Tomo pantallazo BS "E0006-0-BS.png"
  And I enter email y password BS
  And I wait for 1 seconds
    And Tomo pantallazo BS "E0006-1-BS.png"
  And I clic to Sign in BS
  And Clic en la sección de Tags BS
    And Tomo pantallazo BS "E0006-2-BS.png"
  And Página de listado de tags BS
  And Clic en el boton New tag BS
    And Tomo pantallazo BS "E0006-3-BS.png"
  And Nombre del tag "New Tag" BS
    And Tomo pantallazo BS "E0006-4-BS.png"
  And Clic en Descripción del tag BS
  And Descripción del tag "Contenido de tag" BS
    And Tomo pantallazo BS "E0006-5-BS.png"
  And Clic en el boton guardar BS
    And Tomo pantallazo BS "E0006-6-BS.png"
  Then Clic en la sección de Tags BS
    And Tomo pantallazo BS "E0006-7-BS.png"
  When Valida Tag publicado en la lista de tags "New Tag" BS