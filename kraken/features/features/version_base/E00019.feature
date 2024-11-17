Feature: Ghost - Editar Miembro

@user1 @web
Scenario: E0019 - Edit Member
  Given I navigate to page principal
  And Tomo pantallazo BS "E0019-0-BS.png"
  And I enter email y password
  And I wait for 1 seconds
  And Tomo pantallazo BS "E0019-1-BS.png"
  And I clic to Sign in
  And I wait for 3 seconds
  And Clic en la sección de Members
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0019-2-BS.png"
  And Clic en el botón de New Member
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0019-3-BS.png"
  And Contenido de member inicial
  And Clic en Save Member
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0019-4-BS.png"
  And clic en List Members
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0019-5-BS.png"
  And Selecciona miembro por email
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0019-6-BS.png"
  And Editar nombre del miembro
  When Clic en Save Member
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0019-7-BS.png"
  And clic en List Members
  And I wait for 3 seconds
  And Tomo pantallazo BS "E0019-8-BS.png"
  Then Valida nombre del miembro actualizado Base
