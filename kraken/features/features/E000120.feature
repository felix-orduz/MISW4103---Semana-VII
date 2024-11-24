Feature: Ghost

@user2 @web
Scenario: E000120 - Crear una page vacia. sin contenido.
  Given I navigate to page principal
  And I enter email y password
  And I wait for 1 seconds
  And I clic to Sign in
  And Click en la sección de Pages
  And Página de listado de Pages
  And Tomo pantallazo "E00012-1-RC.png"
  When Click en el boton New Page
  And Titulo del page
  And Clic en Contenido page
  And Contenido del Page
  And I wait for 1 seconds
  And Titulo vacio de la Page
  And Clic en Contenido page
  And Contenido vacio de la Page
  And I wait for 1 seconds
  Then Clic en el boton publish-flow page
  And Clic en el boton Continue page
  And Clic en el boton Publish Page
  And Cierre el modal de confirmación page
  And I wait for 1 seconds
  And Tomo pantallazo "E00012-2-RC.png"