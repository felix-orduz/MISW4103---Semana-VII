Feature: Ghost

@user5 @web
Scenario: E000121 - Eliminamos una Page previamente creada
  Given I navigate to page principal
  And I enter email y password
  And I wait for 1 seconds
  And I clic to Sign in
  And Click en la sección de Pages
  And Página de listado de Pages
  When Click en el boton New Page
  And Titulo del page
  And Clic en Contenido page
  And Contenido del Page
  And I wait for 1 seconds
  And Clic en el boton publish-flow page
  And Clic en el boton Continue page
  And Clic en el boton Publish Page
  And Cierre el modal de confirmación page
  And Valida Page publicado en la lista de Pages
  And Tomo pantallazo "E00015-1-RC.png"
  Then Clic derecho en la Page creada
  And Elimino la Page
  And Tomo pantallazo "E00015-2-RC.png"
