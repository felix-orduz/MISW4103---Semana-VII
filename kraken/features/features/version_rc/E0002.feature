Feature: Ghost

@user2 @web
Scenario: E0002 - Crear un post contenido
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
  And Contenido del post
  And Clic en el boton publish-flow
  And Clic en el boton Continue post
  And Clic en el boton Publish Post
  And Cierre el modal de confirmación post
  When Entro al post creado
  Then Valido el contenido del post