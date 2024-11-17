Feature: Ghost - Editar Miembro

@user1 @web
Scenario: E0019 - Edit Member
  Given I navigate to page principal
  And I enter email y password
  And I wait for 1 seconds
  And I clic to Sign in
  And Página principal del administrador
  And Clic en la sección de Members
  And Clic en el botón de New Member
  And Contenido de member inicial
  And Clic en Save Member
  And clic en List Members
  And I wait for 1 seconds
  And Selecciona miembro por email
  And Editar nombre del miembro
  And Clic en Save Member
  When clic en List Members
  Then Valida nombre del miembro actualizado
