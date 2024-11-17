Feature: Ghost - Validación de Email Inválido y Longitud de Nota

@user1 @web
Scenario: E0018 - Validación de Email Inválido y Longitud de Nota
  Given I navigate to page principal
  And I enter email y password
  And I wait for 1 seconds
  And I clic to Sign in
  And Página principal del administrador
  And Clic en la sección de Members
  And Clic en el botón de New Member
  And Contenido de member con email inválido y nota larga
  And Clic en Save Member
  When Verifica mensaje de error de email inválido
  Then Verifica contador de caracteres de nota
