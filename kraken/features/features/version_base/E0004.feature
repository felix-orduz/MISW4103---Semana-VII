Feature: Ghost

@user4 @web
Scenario: E0004 - Editar el contenido de un post previamente creado
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
  And Contenido del post BS
  And I wait for 1 seconds
  And Edito contenido del post BS
  And Clic en boton de Update del post BS
  And Clic en boton Update del post final BS
  And I wait for 1 seconds
  And Clic para devolverse a los posts BS
  When Entro al post editado BS
  Then Valido el contenido del post editado BS