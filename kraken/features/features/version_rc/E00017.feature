Feature: Ghost - Validación de Email Inválido

@user1 @web
Scenario: E0017 - Invalid Email Validation
  Given I navigate to page principal
  And I enter email y password
  And I wait for 1 seconds
  And I clic to Sign in
  And Página principal del administrador
  And Clic en la sección de Members
  And Clic en el botón de New Member
  And Contenido de member con email inválido
  And Clic en Save Member
  When I wait for 2 seconds
  Then Verifica mensaje de error de email inválido
