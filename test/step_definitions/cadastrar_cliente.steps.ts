import { Given, Then, When } from '@cucumber/cucumber';
import * as assert from 'assert';
import { CadastrarClienteController } from '../../src/application/operation/controllers/cadastrar-cliente.controller';
import { IAuthenticationGateway } from '../../src/application/operation/gateways/authentication/Iauthentication.gateway';
import { IClienteGateway } from '../../src/application/operation/gateways/cliente/Icliente.gateway';
import { AutenticaClienteDto } from '../../src/core/cliente/dto/autentica-cliente.dto';
import { Cliente } from '../../src/core/cliente/entity/cliente.entity';
import { CadastrarClienteUseCase } from '../../src/core/cliente/usecase/cadastrar-cliente/cadastrar-cliente.usecase';

let clienteGateway: IClienteGateway;
let authenticationGateway: IAuthenticationGateway;
let cadastrarClienteUseCase: CadastrarClienteUseCase;
let cadastrarClienteController: CadastrarClienteController;
let payload: AutenticaClienteDto;
let response: any;

Given('A module to create a new client', () => {
  clienteGateway = {
    cadastrarCliente: async () => {
      return {
        nome: 'John Doe',
        email: 'john.doe@example.com',
        cpf: '619.799.760-66',
      } as Cliente;
    },
    getCliente: async () => {
      return {
        nome: 'John Doe',
        email: 'john.doe@example.com',
        cpf: '619.799.760-66',
      };
    },
  } as IClienteGateway;
  authenticationGateway = {
    autenticar: async () => 'token',
    decodificarToken: async () => {},
    registrar: async () => {
      return {
        UserConfirmed: true,
      };
    },
  } as IAuthenticationGateway;
  cadastrarClienteUseCase = new CadastrarClienteUseCase(
    clienteGateway,
    authenticationGateway,
  );
  cadastrarClienteController = new CadastrarClienteController(
    cadastrarClienteUseCase,
  );
});

When('Call to cadastrarClienteController', async () => {
  payload = {
    nome: 'John Doe',
    email: 'john.doe@example.com',
    cpf: '619.799.760-66',
    senha: 'password123',
    autenticar: true,
  };

  response = await cadastrarClienteController.handle(payload);
});

Then('The response should be {string}', (token: string) => {
  assert.equal(response, token);
});
