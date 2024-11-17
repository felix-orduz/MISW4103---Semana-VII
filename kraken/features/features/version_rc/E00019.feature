Feature: Ghost - Editar Miembro

@user1 @web
Scenario: E0019 - Edit Member
  Given I navigate to page principal
  And Tomo pantallazo "E00019-0-RC.png"
  And I enter email y password
  And I wait for 1 seconds
  And Tomo pantallazo "E00019-1-RC.png"
  And I clic to Sign in
  And Página principal del administrador
  And Clic en la sección de Members
  And Tomo pantallazo "E00019-2-RC.png"
  And Clic en el botón de New Member
  And Contenido de member inicial
  And Tomo pantallazo "E00019-3-RC.png"
  And Clic en Save Member
  And clic en List Members
  And I wait for 1 seconds
  And Tomo pantallazo "E00019-4-RC.png"
  And Selecciona miembro por email
  And Editar nombre del miembro
  And Tomo pantallazo "E00019-5-RC.png"
  And Clic en Save Member
  When clic en List Members
  And Tomo pantallazo "E00019-6-RC.png"
  Then Valida nombre del miembro actualizado
