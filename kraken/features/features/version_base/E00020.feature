Feature: Ghost - Eliminar Miembro

@user1 @web
Scenario: E0020 - Delete Member
  Given I navigate to page principal BS
  And Tomo pantallazo BS "E0020-0-BS.png"
  And I enter email y password BS
  And I wait for 1 seconds
  And Tomo pantallazo BS "E0020-1-BS.png"
  And I clic to Sign in BS
  And I wait for 4 seconds
  And Clic en la sección de Members Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0020-2-BS.png"
  And Clic en el botón de New Member Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0020-3-BS.png"
  And Contenido del member base
  And Clic en Save Member Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0020-4-BS.png"
  When clic en List Members Base
  And I wait for 1 seconds
  And Tomo pantallazo BS "E0020-5-BS.png"
  And Selecciona miembro por email Base
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0020-6-BS.png"
  When Clic en Eliminar Miembro Base
  And I wait for 3 seconds
  And Confirma eliminación de Miembro Base
  And I wait for 3 seconds
  Then Verifica Miembro eliminado en la lista
