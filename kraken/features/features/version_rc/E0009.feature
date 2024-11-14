Feature: Ghost

@user9 @web
Scenario: E0009 - Crear un tag duplicado nombre y la descripción.
  Given I navigate to page principal
  When I enter email y password
  And I wait for 1 seconds
  Then I clic to Sign in
  Then Página principal del administrador
  Then Clic en la sección de Tags
  Then Página de listado de tags
  Then Clic en el boton New tag
  When Nombre del tag "New Tag1"
  Then Clic en Descripción del tag
  When Descripción del tag "Contenido de tag1"
  Then Clic en el boton guardar
  Then Clic en la sección de Tags
  When Valida Tag publicado en la lista de tags "New Tag1"
  Then Clic en el boton New tag
  When Nombre del tag "New Tag1"
  Then Clic en Descripción del tag
  When Descripción del tag "Contenido de tag1"
  Then Clic en el boton guardar
  Then Clic en la sección de Tags
  When Valida Tag publicado en la lista de tags "New Tag1"