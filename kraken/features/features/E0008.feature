Feature: Ghost

@user8 @web
Scenario: E0008 - Editar un tag con titulo y descripción
  Given I navigate to page "http://localhost:2368/ghost/#/signin"
  When I enter email "d.oicata@uniandes.edu.co" password "1090Oicata@"
  And I wait for 1 seconds
  Then I clic to Sign in
  Then Página principal del administrador
  Then Clic en la sección de Tags
  Then Página de listado de tags
  Then Clic en el tag "New Tag"
  And I wait for 1 seconds
  Then Nombre del tag "New Nombre Modificado"
  Then Clic en Descripción del tag 
  When Descripción del tag "Contenido de modificado"
  Then Clic en el boton guardar
  And I wait for 1 seconds
  Then Clic en la sección de Tags
  When Valida Tag publicado en la lista de tags "New Nombre Modificado"