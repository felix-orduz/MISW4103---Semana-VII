Feature: Ghost

@user1 @web
Scenario: E00016 - Crear Member
  Given I navigate to page principal
  And I enter email y password
  And I wait for 1 seconds
  And I clic to Sign in
  And Página principal del administrador
  And Clic en la sección de Members
  And Clic en el botón de New Member
  And Contenido del member
  And Clic en Save Member
  And clic en List Members
  When I wait for 1 seconds
  Then Valida Member en lista

