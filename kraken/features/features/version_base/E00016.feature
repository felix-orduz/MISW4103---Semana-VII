Feature: Ghost

@user1 @web
Scenario: E00016 - Crear Member
  Given I navigate to page principal
  When I enter email y password
  And I wait for 1 seconds
  Then I clic to Sign in
  Then Página principal del administrador
  Then Clic en la sección de Members
  Then Clic en el botón de New Member
  Then Contenido del member
  Then Clic en Save Member
  Then clic en List Members
  And I wait for 1 seconds
  Then Valida Member en lista

