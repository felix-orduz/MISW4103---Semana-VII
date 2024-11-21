Feature: Ghost

@user8 @web
Scenario: E0008 - Editar un tag con titulo y descripción
  Given I navigate to page principal
    And Tomo pantallazo "E0008-0-RC.png"
  And I enter email y password
  And I wait for 1 seconds
    And Tomo pantallazo "E0008-1-RC.png"
  And I clic to Sign in
  And Clic en la sección de Tags
  And Página de listado de tags
    And Tomo pantallazo "E0008-2-RC.png"
  And Clic en el boton New tag
    And Tomo pantallazo "E0008-3-RC.png"
  And Nombre del tag "Tag 8"
    And Tomo pantallazo "E0008-4-RC.png"
  And Clic en Descripción del tag
  And Descripción del tag "Contenido de tag 8"
    And Tomo pantallazo "E0008-5-RC.png"
  And Clic en el boton guardar
    And Tomo pantallazo "E0008-6-RC.png"
  And Clic en la sección de Tags
  And Página de listado de tags
    And Tomo pantallazo "E0008-7-RC.png"
  And Clic en el tag "Tag 8"
  And I wait for 1 seconds
    And Tomo pantallazo "E0008-8-RC.png"
  And Clic en el input nombre tag
    And Tomo pantallazo "E0008-9-RC.png"
  And Nombre del tag "Nombre Modificado"
  And I wait for 1 seconds
    And Tomo pantallazo "E0008-10-RC.png"
  And Clic en Descripción del tag 
  And Descripción del tag "Contenido modificado"
    And Tomo pantallazo "E0008-11-RC.png"
  And Clic en el boton guardar
  And I wait for 1 seconds
    And Tomo pantallazo "E0008-12-RC.png"
  Then Clic en la sección de Tags
    And Tomo pantallazo "E0008-13-RC.png"
  When Valida Tag publicado en la lista de tags "Nombre Modificado"