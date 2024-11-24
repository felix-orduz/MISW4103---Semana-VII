Feature: Ghost - Validación de Email Inválido

@user1 @web
Scenario: E00058- Invalid Email Validation Aletorio Faker
  And I wait for 3 seconds
  Given I navigate to page principal
  And Tomo pantallazo "E00017-0-RC.png"
  And I enter email y password
  And I wait for 3 seconds
  And Tomo pantallazo "E00017-1-RC.png"
  And I clic to Sign in
  And I wait for 3 seconds
  And Clic en la sección de Members
  And I wait for 3 seconds
  And Tomo pantallazo "E00017-2-RC.png"
  And Clic en el botón de New Member
  And I wait for 3 seconds
  And Contenido de member con email inválido Faker
  And Tomo pantallazo "E00017-3-RC.png"
  And Clic en Save Member
  When I wait for 2 seconds
  And Tomo pantallazo "E00017-4-RC.png"
  Then Verifica mensaje de error de email inválido
