Feature: Ghost

@user1 @web
Scenario: E00016 - Crear Member
  Given I navigate to page principal BS
  And Tomo pantallazo BS "E0001-0-BS.png"
  And I enter email y password
  And I wait for 1 seconds
  And I clic to Sign in
  And Clic en la sección de Members
  And I wait for 3 seconds
  And Clic en el botón de New Member
  And I wait for 3 seconds
  And Contenido del member base
  And Clic en Save Member
  And I wait for 3 seconds
  When clic en List Members
  And I wait for 1 seconds
  Then Valida Member en lista
