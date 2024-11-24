Feature: Ghost - Editar Miembro

@user1 @web
Scenario: E00055 - Edit Member A priori
  Given I navigate to page principal
  And Tomo pantallazo "E00019-0-RC.png"
  And I enter email y password
  And I wait for 3 seconds
  And Tomo pantallazo "E00019-1-RC.png"
  And I clic to Sign in
  And I wait for 3 seconds
  And Clic en la sección de Members
  And Tomo pantallazo "E00019-2-RC.png"
  And I wait for 3 seconds
  And Clic en el botón de New Member
  And I wait for 3 seconds
  And Contenido de member inicial A Priori 3
  And Tomo pantallazo "E00019-3-RC.png"
  And Clic en Save Member
  And I wait for 3 seconds
  And clic en List Members
  And I wait for 3 seconds
  And Tomo pantallazo "E00019-4-RC.png"
  And Selecciona miembro por email
  And I wait for 3 seconds
  And Editar nombre del miembro A Priori 4
  And Tomo pantallazo "E00019-5-RC.png"
  And Clic en Save Member
  And I wait for 3 seconds
  When clic en List Members
  And Tomo pantallazo "E00019-6-RC.png"
  Then Valida nombre del miembro actualizado
