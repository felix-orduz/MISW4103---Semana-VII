Feature: Ghost

@user1 @web
Scenario: E0001 - Crear un post con titulo
  Given I navigate to page principal
  And I enter email y password
  And I wait for 1 seconds
  And I clic to Sign in
  And Clic en la sección de Posts
  And Página de listado de posts
  And Clic en el boton New Post
  And Titulo del post
  And Clic en Contenido post
  And I wait for 1 seconds
  And Clic en el boton publish-flow
  And Clic en el boton Continue post
  And Clic en el boton Publish Post
  When Cierre el modal de confirmación post
  Then Valida Post publicado en la lista de posts