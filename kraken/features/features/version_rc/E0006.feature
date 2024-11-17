Feature: Ghost

@user6 @web
Scenario: E0006 - Crear un tag con nombre y descripción
  Given I navigate to page principal
    And Tomo pantallazo "E0006-0-RC.png"
  And I enter email y password
  And I wait for 1 seconds
    And Tomo pantallazo "E0006-1-RC.png"
  And I clic to Sign in
  And Clic en la sección de Tags
    And Tomo pantallazo "E0006-2-RC.png"
  And Página de listado de tags
  And Clic en el boton New tag
    And Tomo pantallazo "E0006-3-RC.png"
  And Nombre del tag "New Tag"
    And Tomo pantallazo "E0006-4-RC.png"
  And Clic en Descripción del tag
  And Descripción del tag "Contenido de tag"
    And Tomo pantallazo "E0006-5-RC.png"
  And Clic en el boton guardar
    And Tomo pantallazo "E0006-6-RC.png"
  Then Clic en la sección de Tags
    And Tomo pantallazo "E0006-7-RC.png"
  When Valida Tag publicado en la lista de tags "New Tag"