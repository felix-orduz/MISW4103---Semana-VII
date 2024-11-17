Feature: Ghost - Validación de Email Inválido

@user1 @web
Scenario: E0017 - Invalid Email Validation
  Given I navigate to page principal BS
  And Tomo pantallazo BS "E0017-0-BS.png"
  And I enter email y password BS
  And I wait for 1 seconds
  And Tomo pantallazo BS "E0017-1-BS.png"
  And I clic to Sign in BS
  And I wait for 4 seconds
  And Clic en la sección de Members Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0017-2-BS.png"
  And Clic en el botón de New Member Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0017-3-BS.png"
  And Contenido de member con email inválido
  And Tomo pantallazo BS "E0017-4-BS.png"
  When Clic en Save Member Base
  And I wait for 2 seconds
  And Tomo pantallazo BS "E0017-5-BS.png"
  Then Verifica mensaje de error de email inválido
