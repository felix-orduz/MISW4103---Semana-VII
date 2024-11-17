Feature: Ghost - Validación de Email Inválido

@user1 @web
Scenario: E0017 - Invalid Email Validation
  Given I navigate to page principal
  And Tomo pantallazo "E00017-0-RC.png"
  And I enter email y password
  And I wait for 1 seconds
  And Tomo pantallazo "E00017-1-RC.png"
  And I clic to Sign in
  And Clic en la sección de Members
  And Tomo pantallazo "E00017-2-RC.png"
  And Clic en el botón de New Member
  And Contenido de member con email inválido
  And Tomo pantallazo "E00017-3-RC.png"
  And Clic en Save Member
  When I wait for 2 seconds
  And Tomo pantallazo "E00017-4-RC.png"
  Then Verifica mensaje de error de email inválido
