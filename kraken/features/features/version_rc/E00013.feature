Feature: Ghost

@user3 @web
Scenario: E0003 - Editar el titulo de un post previamente creado
  Given I navigate to page principal
  And I enter email y password
  And I wait for 1 seconds
  And I clic to Sign in
  And Página principal del administrador
  And Click en la sección de Pages
  And Página de listado de Pages
  And Tomo pantallazo "E00013-1-RC.png"
  When Click en el boton New Page
  And Titulo del page
  And Clic en Contenido page
  And Contenido del Page
  And I wait for 1 seconds
  And Clic en el boton publish-flow page
  And Clic en el boton Continue page
  And Clic en el boton Publish Page
  And Cierre el modal de confirmación page
  Then Entro a la Page creada
  And Edito el titulo de la Page
  And Clic en Contenido page
  And Clic en boton de Update
  And Clic para devolverse a las Pages
  And Tomo pantallazo "E00013-2-RC.png"