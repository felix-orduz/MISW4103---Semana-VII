Feature: Ghost

@user1 @web
Scenario: E0003 - Editar el titulo de un post previamente creado
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
  And Contenido del post BS
  And Clic en el boton Publish Post BS
  And Clic en el boton publish final BS
  And Clic para devolverse a los posts BS
  And Entro al post creado BS
  And Edito el titulo del post BS
  And Contenido del post BS
  And I wait for 1 seconds
  And Clic en boton de Update del post BS
  And Clic en boton Update del post final BS
  And I wait for 1 seconds
  When Clic para devolverse a los posts BS
  Then Valida titulo del Post editado en la lista de posts BS