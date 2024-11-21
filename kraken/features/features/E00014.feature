Feature: Ghost

@user3 @web
Scenario: E00014 - Actualizar el estado de la page previamente creada a unpublish
  Given I navigate to page principal
  And I enter email y password
  And I wait for 1 seconds
  And I clic to Sign in
  And Click en la sección de Pages
  And Página de listado de Pages
  And Tomo pantallazo "E00014-1-RC.png"
  And Clic en el boton New Page
  And Titulo del Page
  And Clic en Contenido page
  And Contenido del Page
  And I wait for 1 seconds
  When Clic en el boton publish-flow page
  Then Clic en el boton Continue page
  And Clic en el boton Publish Page
  And Cierre el modal de confirmación page
  And Entro a la Page creada
  And Click en el boton UnPublish Page
  And Click en el boton revert to draft Page
  And Clic para devolverse a las Pages
  And Tomo pantallazo "E00014-2-RC.png"