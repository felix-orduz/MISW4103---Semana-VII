Feature: Ghost

@user1 @web
Scenario: E0002 - Crear un post contenido
  Given I navigate to page principal BS
  And Tomo pantallazo BS "E0002-0-BS.png"
  And I enter email y password BS
  And I wait for 1 seconds
  And Tomo pantallazo BS "E0002-1-BS.png"
  And I clic to Sign in BS
  And Clic en la sección de Posts BS
  And Página de listado de posts BS
  And Tomo pantallazo BS "E0002-2-BS.png"
  And Clic en el boton New Post BS
  And Titulo del post BS
  And Clic en Contenido post BS
  And I wait for 1 seconds
  And Tomo pantallazo BS "E0002-3-BS.png"
  And Contenido del post BS
  And Clic en el boton Publish Post BS
  And Tomo pantallazo BS "E0002-4-BS.png"
  And Clic en el boton publish final BS
  And Clic para devolverse a los posts BS
  When Entro al post creado BS
  Then Valido el contenido del post BS
  And Tomo pantallazo BS "E0002-5-BS.png"