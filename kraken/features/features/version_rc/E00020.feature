Feature: Ghost - Eliminar Miembro

@user1 @web
Scenario: E0020 - Delete Member
  Given I navigate to page principal
  And I enter email y password
  And I wait for 1 seconds
  And I clic to Sign in
  And Página principal del administrador
  And Clic en la sección de Members
  And Clic en el botón de New Member
  And Contenido de member para eliminar
  And Clic en Save Member
  And clic en List Members
  And I wait for 1 seconds
  And Selecciona Member para editar
  And Abre menú de acciones del miembro
  And Clic en Eliminar Miembro
  When Confirma eliminación de Miembro
  Then Verifica Miembro eliminado en la lista
