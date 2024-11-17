Feature: Ghost - Validación de Email Inválido y Longitud de Nota

@user1 @web
Scenario: E0018 - Validación de Email Inválido y Longitud de Nota
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
  And Contenido de member con email inválido y nota larga
  And Tomo pantallazo BS "E0018-4-BS.png"
  When Clic en Save Member Base
  And I wait for 2 seconds
  And Tomo pantallazo BS "E0018-5-BS.png"
  Then Verifica mensaje de error de email inválido
  And Verifica contador de caracteres de nota
