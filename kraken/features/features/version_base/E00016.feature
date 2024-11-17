Feature: Ghost

@user1 @web
Scenario: E00016 - Crear Member
  Given I navigate to page principal BS
  And Tomo pantallazo BS "E0016-0-BS.png"
  And I enter email y password BS
  And I wait for 1 seconds
  And Tomo pantallazo BS "E0016-1-BS.png"
  And I clic to Sign in BS
  And I wait for 4 seconds
  And Clic en la sección de Members Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0016-2-BS.png"
  And Clic en el botón de New Member Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0016-3-BS.png"
  And Contenido del member base
  And Clic en Save Member Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0016-4-BS.png"
  When clic en List Members Base
  And I wait for 1 seconds
  And Tomo pantallazo BS "E0016-5-BS.png"
  Then Valida Member en lista Base

