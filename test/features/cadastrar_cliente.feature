Feature: Cadastrar Cliente

  Scenario: Cadastrar Cliente
    Given A module to create a new client
    When Call to cadastrarClienteController
    Then The response should be "token"
