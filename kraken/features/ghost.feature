Feature: Ghost

@user10 @web
Scenario: E00010 - Crear tag con caracteres especiales.
  Given I navigate to page principal
    And Tomo pantallazo "E00010-0-RC.png"
  And I enter email y password
  And I wait for 1 seconds
    And Tomo pantallazo "E00010-1-RC.png"
  And I clic to Sign in
  And Clic en la sección de Tags
  And Página de listado de tags
    And Tomo pantallazo "E00010-2-RC.png"
  And Clic en el boton New tag
    And Tomo pantallazo "E00010-3-RC.png"
  And Nombre del tag con caracteres especiales "$%&$%&$%"
    And Tomo pantallazo "E00010-4-RC.png"
  And Clic en Descripción del tag
  And Descripción del tag "dsfghjklhjfgchgjkjlñl34567890345678"
    And Tomo pantallazo "E00010-5-RC.png"
  And Clic en el boton guardar
    And Tomo pantallazo "E00010-6-RC.png"
  Then Clic en la sección de Tags
    And Tomo pantallazo "E00010-7-RC.png"
  When Valida Tag publicado en la lista de tags "$%&$%&$%"