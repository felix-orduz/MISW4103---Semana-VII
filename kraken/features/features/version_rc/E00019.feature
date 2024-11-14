Feature: Ghost - Editar Miembro

@user1 @web
Scenario: E0019 - Edit Member
  Given I navigate to page principal
  When I enter email y password
  And I wait for 1 seconds
  Then I clic to Sign in
  Then Página principal del administrador
  Then Clic en la sección de Members
  Then Clic en el botón de New Member
  Then Contenido de member inicial
  Then Clic en Save Member
  Then clic en List Members
  And I wait for 1 seconds
  Then Selecciona miembro por email
  Then Editar nombre del miembro
  Then Clic en Save Member
  Then clic en List Members
  Then Valida nombre del miembro actualizado
