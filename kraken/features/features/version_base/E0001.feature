Feature: Ghost

@user1 @web
Scenario: E0001 - Crear un post con titulo
  Given I navigate to page principal BS
  And I enter email y password BS
  And I wait for 1 seconds
  And I clic to Sign in BS
  And Clic en la sección de Posts BS
  And Página de listado de posts BS
  And Clic en el boton New Post BS
  And Titulo del post BS
  And Clic en Contenido post BS
  And I wait for 1 seconds
  And Clic en el boton Publish Post BS
  And Clic en el boton publish final BS
  When Clic para devolverse a los posts BS
  Then Valida Post publicado en la lista de posts BS