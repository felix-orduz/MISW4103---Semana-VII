Feature: Ghost - Editar Miembro

@user1 @web
Scenario: E0019 - Edit Member
  Given I navigate to page principal BS
  And Tomo pantallazo BS "E0019-0-BS.png"
  And I enter email y password BS
  And I wait for 1 seconds
  And Tomo pantallazo BS "E0019-1-BS.png"
  And I clic to Sign in BS
  And I wait for 4 seconds
  And Clic en la sección de Members Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0019-2-BS.png"
  And Clic en el botón de New Member Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0019-3-BS.png"
  And Contenido del member base
  And Clic en Save Member Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0019-4-BS.png"
  When clic en List Members Base
  And I wait for 1 seconds
  And Tomo pantallazo BS "E0019-5-BS.png"
  And Selecciona miembro por email Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0019-6-BS.png"
  And Editar nombre del miembro base
  And Clic en Save Member Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0019-7-BS.png"
  When clic en List Members Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0019-8-BS.png"
  Then Valida Member en lista Base
