Feature: Ghost

@user3 @web
Scenario: E0003 - Editar el titulo de un post previamente creado
  Given I navigate to page principal
  And Tomo pantallazo "E0003-0-RC.png"
  And I enter email y password
  And I wait for 1 seconds
  And Tomo pantallazo "E0003-1-RC.png"
  And I clic to Sign in
  And Clic en la sección de Posts
  And Página de listado de posts
  And Tomo pantallazo "E0003-2-RC.png"
  And Clic en el boton New Post
  And Titulo del post
  And Clic en Contenido post
  And I wait for 1 seconds
  And Contenido del post
  And Tomo pantallazo "E0003-3-RC.png"
  And Clic en el boton publish-flow
  And Clic en el boton Continue post
  And Tomo pantallazo "E0003-4-RC.png"
  And Clic en el boton Publish Post
  And Cierre el modal de confirmación post
  And Entro al post creado
  And Edito el titulo del post
  And Clic en Contenido post
  And I wait for 1 seconds
  And Tomo pantallazo "E0003-5-RC.png"
  And Clic en boton de Update del post
  And Tomo pantallazo "E0003-6-RC.png"
  When Clic para devolverse a los posts
  Then Valida titulo del Post editado en la lista de posts