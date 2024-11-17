Feature: Ghost

@user1 @web
Scenario: E011 - Crear un page
  Given I navigate to page principal
  And I enter email y password
  And I wait for 1 seconds
  And I clic to Sign in
  And Página principal del administrador
  And Click en la sección de Pages
  And Página de listado de Pages
  And Tomo pantallazo "E00011-1-RC.png"
  And Click en el boton New Page
  And Titulo del page
  And Clic en Contenido page
  And I wait for 1 seconds
  When Clic en el boton publish-flow page
  Then Clic en el boton Continue page
  And Clic en el boton Publish Page
  And Cierre el modal de confirmación page
  And Tomo pantallazo "E00014-2-RC.png"