Feature: Ghost - Eliminar Miembro

@user1 @web
Scenario: E00056 - Delete Member A Priori
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
  And Contenido de member para eliminar A Priori 6
  And Tomo pantallazo "E00020-4-RC.png"
  And Clic en Save Member
  And I wait for 3 seconds
  And clic en List Members
  And I wait for 3 seconds
  And Tomo pantallazo "E00020-5-RC.png"
  Then Verifica Miembro eliminado en la lista
