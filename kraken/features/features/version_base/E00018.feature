Feature: Ghost - Validación de Email Inválido y Longitud de Nota

@user1 @web
Scenario: E0018 - Validación de Email Inválido y Longitud de Nota
  Given I navigate to page principal
  And Tomo pantallazo BS "E0018-0-BS.png"
  And I enter email y password
  And I wait for 1 seconds
  And Tomo pantallazo BS "E0018-1-BS.png"
  And I clic to Sign in
  And I wait for 3 seconds
  And Clic en la sección de Members
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0018-2-BS.png"
  And Clic en el botón de New Member
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0018-3-BS.png"
  And Contenido de member con email inválido y nota larga
  And Tomo pantallazo BS "E0018-4-BS.png"
  When Clic en Save Member
  And I wait for 2 seconds
  And Tomo pantallazo BS "E0018-5-BS.png"
  Then Verifica mensaje de error de email inválido
  And Verifica contador de caracteres de nota
