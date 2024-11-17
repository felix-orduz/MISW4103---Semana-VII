Feature: Ghost

@user7 @web
Scenario: E0007 - Editar un tag con su descripción
  Given I navigate to page principal
    And Tomo pantallazo "E0007-0-RC.png"
  And I enter email y password
  And I wait for 1 seconds
    And Tomo pantallazo "E0007-1-RC.png"
  And I clic to Sign in
  And Clic en la sección de Tags
  And Página de listado de tags
    And Tomo pantallazo "E0007-2-RC.png"
  And Clic en el boton New tag
    And Tomo pantallazo "E0007-3-RC.png"
  And Nombre del tag "Tag 7"
    And Tomo pantallazo "E0007-4-RC.png"
  And Clic en Descripción del tag
  And Descripción del tag "Contenido de tag 7"
    And Tomo pantallazo "E0007-5-RC.png"
  And Clic en el boton guardar
    And Tomo pantallazo "E0007-6-RC.png"
  And Clic en la sección de Tags
  And Página de listado de tags
    And Tomo pantallazo "E0007-7-RC.png"
  And Clic en el tag "Tag 7"
  And I wait for 1 seconds
    And Tomo pantallazo "E0007-8-RC.png"
  And Clic en Descripción del tag
  And Descripción del tag "Contenido de tag"
    And Tomo pantallazo "E0007-9-RC.png"
  And Clic en el boton guardar
  And I wait for 1 seconds
    And Tomo pantallazo "E0007-10-RC.png"
  Then Clic en la sección de Tags
    And Tomo pantallazo "E0007-11-RC.png"
  When Valida Tag publicado en la lista de tags "Tag 7"