Feature: Ghost

@user1 @web
Scenario: E00016 - Crear Member
<<<<<<< HEAD
  Given I navigate to page principal BS
  And Tomo pantallazo BS "E0001-0-BS.png"
=======
  Given I navigate to page principal
  And Tomo pantallazo "E00016-0-RC.png"
>>>>>>> 74db09039b7780bf39c38776ee42f95e21cd32f8
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
  And Contenido del member base
  And Clic en Save Member
  And I wait for 3 seconds
  And Tomo pantallazo "E00016-4-RC.png"
  When clic en List Members
  And I wait for 1 seconds
  And Tomo pantallazo "E00016-5-RC.png"
  Then Valida Member en lista
