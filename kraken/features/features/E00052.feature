Feature: Ghost

@user1 @web
Scenario: E00052 - Crear Member - Datos A Priori
  Given I navigate to page principal
  And Tomo pantallazo "E00016-0-RC.png"
  And I enter email y password
  And I wait for 1 seconds
  And Tomo pantallazo "E00016-1-RC.png"
  And I clic to Sign in
  And Clic en la sección de Members
  And I wait for 3 seconds
  And Tomo pantallazo "E00016-2-RC.png"
  And Clic en el botón de New Member
  And I wait for 3 seconds
  And Tomo pantallazo "E00016-3-RC.png"
  And Contenido del member base A Priori 0
  And Clic en Save Member
  And I wait for 3 seconds
  And Tomo pantallazo "E00016-4-RC.png"
  When clic en List Members
  And I wait for 1 seconds
  And Tomo pantallazo "E00016-5-RC.png"
  Then Valida Member en lista
