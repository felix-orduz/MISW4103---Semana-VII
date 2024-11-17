Feature: Ghost

@user7 @web
Scenario: E0007 - Editar un tag con su descripción
  Given I navigate to page principal
    And Tomo pantallazo BS "E0007-0-BS.png"
  And I enter email y password BS
  And I wait for 1 seconds
    And Tomo pantallazo BS "E0007-1-BS.png"
  And I clic to Sign in BS
  And Clic en la sección de Tags BS
  And Página de listado de tags BS
    And Tomo pantallazo BS "E0007-2-BS.png"
  And Clic en el boton New tag BS
    And Tomo pantallazo BS "E0007-3-BS.png"
  And Nombre del tag "Tag 7" BS
    And Tomo pantallazo BS "E0007-4-BS.png"
  And Clic en Descripción del tag BS
  And Descripción del tag "Contenido de tag 7" BS
    And Tomo pantallazo BS "E0007-5-BS.png"
  And Clic en el boton guardar BS
    And Tomo pantallazo BS "E0007-6-BS.png"
  And Clic en la sección de Tags BS
  And Página de listado de tags BS
    And Tomo pantallazo BS "E0007-7-BS.png"
  And Clic en el tag "Tag 7" BS
  And I wait for 1 seconds
    And Tomo pantallazo BS "E0007-8-BS.png"
  And Clic en Descripción del tag BS
  And Descripción del tag "Contenido de tag" BS
    And Tomo pantallazo BS "E0007-9-BS.png"
  And Clic en el boton guardar BS
  And I wait for 1 seconds
    And Tomo pantallazo BS "E0007-10-BS.png"
  Then Clic en la sección de Tags BS
    And Tomo pantallazo BS "E0007-11-BS.png"
  When Valida Tag publicado en la lista de tags "Tag 7" BS