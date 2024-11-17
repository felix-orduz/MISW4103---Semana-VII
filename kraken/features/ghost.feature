Feature: Ghost

@user4 @web
Scenario: E0004 - Editar el contenido de un post previamente creado
  Given I navigate to page principal
  And Tomo pantallazo "E0004-0-RC.png"
  And I enter email y password
  And I wait for 1 seconds
  And Tomo pantallazo "E0004-1-RC.png"
  And I clic to Sign in
  And Clic en la sección de Posts
  And Página de listado de posts
  And Tomo pantallazo "E0004-2-RC.png"
  And Clic en el boton New Post
  And Titulo del post
  And Clic en Contenido post
  And I wait for 1 seconds
  And Contenido del post
  And Tomo pantallazo "E0004-3-RC.png"
  And Clic en el boton publish-flow
  And Clic en el boton Continue post
  And Tomo pantallazo "E0004-4-RC.png"
  And Clic en el boton Publish Post
  And Cierre el modal de confirmación post
  And Entro al post creado
  And Clic en Contenido post
  And I wait for 1 seconds
  And Edito contenido del post
  And Tomo pantallazo "E0004-5-RC.png"
  And Clic en boton de Update del post
  And Tomo pantallazo "E0004-6-RC.png"
  And Clic para devolverse a los posts
  When Entro al post creado
  Then Valido el contenido del post editado