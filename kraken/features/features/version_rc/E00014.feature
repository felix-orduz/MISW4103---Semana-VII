Feature: Ghost

@user3 @web
Scenario: E00014 - Actualizar el estado de la page previamente creada a unpublish
  Given I navigate to page principal
  When I enter email y password
  And I wait for 1 seconds
  Then I clic to Sign in
  Then Página principal del administrador
  Then Click en la sección de Pages
  Then Página de listado de Pages
  When Clic en el boton New Page
  Then Titulo del Page
  Then Clic en Contenido page
  Then Contenido del Page
  And I wait for 1 seconds
  Then Clic en el boton publish-flow page
  Then Clic en el boton Continue page
  Then Clic en el boton Publish Page
  Then Cierre el modal de confirmación page
  Then Entro a la Page creada
  Then Click en el boton UnPublish Page
  Then Click en el boton revert to draft Page
  Then Clic para devolverse a las Pages