Feature: Ghost

@user1 @web
Scenario: E00016 - Crear Member
  Given I navigate to page principal
  And Tomo pantallazo BS "E00016-0-BS.png"
  And I enter email y password
  And I wait for 1 seconds
  And Tomo pantallazo BS "E00016-1-BS.png"
  And I clic to Sign in
  And Página principal del administrador
  And Clic en la sección de Members
  And Tomo pantallazo BS "E00016-2-BS.png"
  And Clic en el botón de New Member
  And Tomo pantallazo BS "E00016-3-BS.png"
  And Contenido del member
  And Clic en Save Member
  And Tomo pantallazo BS "E00016-4-BS.png"
  And clic en List Members
  When I wait for 1 seconds
  And Tomo pantallazo BS "E00016-5-BS.png"
  Then Valida Member en lista

