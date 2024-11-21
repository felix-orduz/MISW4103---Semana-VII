Feature: Ghost

@user5 @web
Scenario: E0005 - Eliminamos un post previamente creado
  Given I navigate to page principal
  And Tomo pantallazo "E0005-0-RC.png"
  And I enter email y password
  And I wait for 1 seconds
  And Tomo pantallazo "E0005-1-RC.png"
  And I clic to Sign in
  And Clic en la sección de Posts
  And Página de listado de posts
  And Tomo pantallazo "E0005-2-RC.png"
  And Clic en el boton New Post
  And Titulo del post
  And Clic en Contenido post
  And I wait for 1 seconds
  And Tomo pantallazo "E0005-3-RC.png"
  And Clic en el boton publish-flow
  And Clic en el boton Continue post
  And Tomo pantallazo "E0005-4-RC.png"
  And Clic en el boton Publish Post
  And Cierre el modal de confirmación post
  And Clic derecho en el post creado
  And Tomo pantallazo "E0005-5-RC.png"
  When Clic en Elimino el post
  Then Elimino post