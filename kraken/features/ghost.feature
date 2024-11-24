Feature: Ghost - Eliminar Miembro

@user1 @web
Scenario: E000124 - Delete Member Aletorio Faker
  Given I navigate to page principal
  And Tomo pantallazo "E00020-1-RC.png"
  And I enter email y password
  And I wait for 1 seconds
  And Tomo pantallazo "E00020-2-RC.png"
  And I clic to Sign in
  And Clic en la sección de Members
  And I wait for 3 seconds
  And Tomo pantallazo "E00020-3-RC.png"
  And Clic en el botón de New Member
  And I wait for 3 seconds
  And Contenido de member para eliminar Faker
  And Clic en Save Member
  And I wait for 3 seconds
  And clic en List Members
  And I wait for 1 seconds
  And Tomo pantallazo "E00020-5-RC.png"
  And Selecciona miembro por email
  And Abre menú de acciones del miembro
  And Tomo pantallazo "E00020-6-RC.png"
  And Clic en Eliminar Miembro
  And I wait for 2 seconds
  When Confirma eliminación de Miembro
  And Tomo pantallazo "E00020-7-RC.png"
  Then Verifica Miembro eliminado en la lista
