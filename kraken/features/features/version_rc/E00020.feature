Feature: Ghost - Eliminar Miembro

@user1 @web
Scenario: E0020 - Delete Member
  Given I navigate to page principal
  When I enter email y password
  And I wait for 1 seconds
  Then I clic to Sign in
  Then Página principal del administrador
  Then Clic en la sección de Members
  Then Clic en el botón de New Member
  Then Contenido de member para eliminar
  Then Clic en Save Member
  Then clic en List Members
  And I wait for 1 seconds
  Then Selecciona Member para editar
  Then Abre menú de acciones del miembro
  Then Clic en Eliminar Miembro
  Then Confirma eliminación de Miembro
  Then Verifica Miembro eliminado en la lista
