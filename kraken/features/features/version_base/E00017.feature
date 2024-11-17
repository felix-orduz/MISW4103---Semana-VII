Feature: Ghost - Validación de Email Inválido

@user1 @web
Scenario: E0017 - Invalid Email Validation
  Given I navigate to page principal
  And Tomo pantallazo BS "E00017-0-BS.png"
  And I enter email y password
  And I wait for 1 seconds
  And Tomo pantallazo BS "E00017-1-BS.png"
  And I clic to Sign in
  And Página principal del administrador
  And Clic en la sección de Members
  And Tomo pantallazo BS "E00017-2-BS.png"
  And Clic en el botón de New Member
  And Contenido de member con email inválido
  And Tomo pantallazo BS "E00017-3-BS.png"
  And Clic en Save Member
  When I wait for 2 seconds
  And Tomo pantallazo BS "E00017-4-BS.png"
  Then Verifica mensaje de error de email inválido
