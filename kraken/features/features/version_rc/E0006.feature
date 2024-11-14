Feature: Ghost

@user6 @web
Scenario: E0006 - Crear un tag con nombre y descripción
  Given I navigate to page principal
  When I enter email y password
  And I wait for 1 seconds
  Then I clic to Sign in
  Then Página principal del administrador
  Then Clic en la sección de Tags
  Then Página de listado de tags
  Then Clic en el boton New tag
  When Nombre del tag "New Tag"
  Then Clic en Descripción del tag
  Then Descripción del tag "Contenido de tag"
  Then Clic en el boton guardar
  Then Clic en la sección de Tags
  When Valida Tag publicado en la lista de tags "New Tag"