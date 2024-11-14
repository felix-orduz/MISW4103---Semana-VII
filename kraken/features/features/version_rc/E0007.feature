Feature: Ghost

@user7 @web
Scenario: E0007 - Editar un tag con su descripción
  Given I navigate to page principal
  When I enter email y password
  And I wait for 1 seconds
  Then I clic to Sign in
  Then Página principal del administrador
  Then Clic en la sección de Tags
  Then Página de listado de tags
  Then Clic en el boton New tag
  When Nombre del tag "Tag 7"
  Then Clic en Descripción del tag
  Then Descripción del tag "Contenido de tag 7"
  Then Clic en el boton guardar
  Then Clic en la sección de Tags
  Then Página de listado de tags
  When Clic en el tag "Tag 7"
  And I wait for 1 seconds
  Then Clic en Descripción del tag
  When Descripción del tag "Contenido de tag"
  Then Clic en el boton guardar
  And I wait for 1 seconds
  Then Clic en la sección de Tags
  When Valida Tag publicado en la lista de tags "Tag 7"