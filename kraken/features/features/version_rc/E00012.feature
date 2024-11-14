Feature: Ghost

@user2 @web
Scenario: E012 - Crear una page vacia. sin contenido.
  Given I navigate to page principal
  When I enter email y password
  And I wait for 1 seconds
  Then I clic to Sign in
  Then Página principal del administrador
  Then Click en la sección de Pages
  Then Página de listado de Pages
  When Click en el boton New Page
  Then Titulo del page
  Then Clic en Contenido page
  Then Contenido del Page
  And I wait for 1 seconds
  Then Titulo vacio de la Page
  Then Clic en Contenido page
  Then Contenido vacio de la Page
  And I wait for 1 seconds
  Then Clic en el boton publish-flow page
  Then Clic en el boton Continue page
  Then Clic en el boton Publish Page
  Then Cierre el modal de confirmación page
  And I wait for 1 seconds