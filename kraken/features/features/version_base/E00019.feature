Feature: Ghost - Editar Miembro

@user1 @web
Scenario: E00019 - Edit Member
  Given I navigate to page principal BS
  And Tomo pantallazo BS "E00019-0-BS.png"
  And I enter email y password BS
  And I wait for 1 seconds
  And Tomo pantallazo BS "E00019-1-BS.png"
  And I clic to Sign in BS
  And I wait for 4 seconds
  And Clic en la sección de Members Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E00019-2-BS.png"
  And Clic en el botón de New Member Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E00019-3-BS.png"
  And Contenido del member base
  And Clic en Save Member Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E00019-4-BS.png"
  When clic en List Members Base
  And I wait for 1 seconds
  And Tomo pantallazo BS "E00019-5-BS.png"
  And Selecciona miembro por email Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E00019-6-BS.png"
  And Editar nombre del miembro base
  And Clic en Save Member Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E00019-7-BS.png"
  When clic en List Members Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E00019-8-BS.png"
  Then Valida Member en lista Base
