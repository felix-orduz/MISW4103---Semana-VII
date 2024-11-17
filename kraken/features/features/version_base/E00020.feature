Feature: Ghost - Eliminar Miembro

@user1 @web
Scenario: E0020 - Delete Member
  Given I navigate to page principal
  And Tomo pantallazo BS "E0020-0-BS.png"
  And I enter email y password
  And I wait for 1 seconds
  And Tomo pantallazo BS "E0020-1-BS.png"
  And I clic to Sign in
  And I wait for 3 seconds
  And Clic en la sección de Members
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0020-2-BS.png"
  And Clic en el botón de New Member
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0020-3-BS.png"
  And Contenido de member inicial
  And Clic en Save Member
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0020-4-BS.png"
  And clic en List Members
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0020-5-BS.png"
  And Selecciona miembro por email
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0020-6-BS.png"
  When Clic en Eliminar Miembro Base
  And I wait for 3 seconds
  and Confirma eliminación de Miembro
  And I wait for 3 seconds
  Then Verifica Miembro eliminado en la lista
