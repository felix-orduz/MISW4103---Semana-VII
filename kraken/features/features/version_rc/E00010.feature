Feature: Ghost

@user10 @web
Scenario: E00010 - Crear tag con caracteres especiales.
  Given I navigate to page principal
  When I enter email y password
  And I wait for 1 seconds
  Then I clic to Sign in
  Then Página principal del administrador
  Then Clic en la sección de Tags
  Then Página de listado de tags
  Then Clic en el boton New tag
  When Nombre del tag con caracteres especiales "$%&$%&$%"
  Then Clic en Descripción del tag
  When Descripción del tag "dsfghjklhjfgchgjkjlñl34567890345678"
  Then Clic en el boton guardar
  Then Clic en la sección de Tags
  When Valida Tag publicado en la lista de tags "$%&$%&$%"