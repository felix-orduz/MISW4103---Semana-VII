Feature: Ghost

@user9 @web
Scenario: E0009 - Crear un tag duplicado nombre y la descripción.
  Given I navigate to page principal
    And Tomo pantallazo "E0009-0-RC.png"
  And I enter email y password
  And I wait for 1 seconds
    And Tomo pantallazo "E0009-1-RC.png"
  And I clic to Sign in
  And Clic en la sección de Tags
  And Página de listado de tags
    And Tomo pantallazo "E0009-2-RC.png"
  And Clic en el boton New tag
  And Nombre del tag "New Tag1"
    And Tomo pantallazo "E0009-3-RC.png"
  And Clic en Descripción del tag
  And Descripción del tag "Contenido de tag1"
    And Tomo pantallazo "E0009-4-RC.png"
  And Clic en el boton guardar
    And Tomo pantallazo "E0009-5-RC.png"
  And Clic en la sección de Tags
  And Valida Tag publicado en la lista de tags "New Tag1"
    And Tomo pantallazo "E0009-6-RC.png"
  And Clic en el boton New tag
    And Tomo pantallazo "E0009-7-RC.png"
  And Nombre del tag "New Tag1"
    And Tomo pantallazo "E0009-8-RC.png"
  And Clic en Descripción del tag
  And Descripción del tag "Contenido de tag1"
    And Tomo pantallazo "E0009-9-RC.png"
  And Clic en el boton guardar
    And Tomo pantallazo "E0009-10-RC.png"
  Then Clic en la sección de Tags
    And Tomo pantallazo "E0009-11-RC.png"
  When Valida Tag publicado en la lista de tags "New Tag1"