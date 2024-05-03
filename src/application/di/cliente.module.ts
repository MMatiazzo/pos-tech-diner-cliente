import { Module } from "@nestjs/common";
import { Provider } from '@nestjs/common/interfaces/modules/provider.interface';
import { ClienteControllerRoute } from "../api/http-rest/routes/cliente.routes";
import { PrismaService } from "src/infrastructure/persistence/prisma/prisma.service";
import { IClienteRepository } from "src/infrastructure/persistence/repositories/Icliente.repository";
import { ClientePostgresRepository } from "src/infrastructure/persistence/repositories/cliente.postgres.repository";
import { IClienteGateway } from "../operation/gateways/cliente/Icliente.gateway";
import { ClienteGateway } from "../operation/gateways/cliente/cliente.gateway";
import { CadastrarClienteUseCase } from "src/core/cliente/usecase/cadastrar-cliente/cadastrar-cliente.usecase";
import { CadastrarClienteController } from "../operation/controllers/cadastrar-cliente.controller";
import { IAuthenticationGateway } from "../operation/gateways/authentication/Iauthentication.gateway";
import { AuthLambda } from "../operation/gateways/authentication/aws/authentication-lambda.gateway";

const persistenceProviders: Provider[] = [
  PrismaService,
  {
    provide: IClienteRepository,
    useFactory: (prisma: PrismaService) => new ClientePostgresRepository(prisma),
    inject: [PrismaService]
  },
  {
    provide: IClienteGateway,
    useFactory: (clienteRepository: IClienteRepository) => new ClienteGateway(clienteRepository),
    inject: [IClienteRepository]
  },
  {
    provide: IAuthenticationGateway,
    useFactory: () => new AuthLambda(),
    inject: [],
  }
]

const useCaseProviders: Provider[] = [
  {
    provide: CadastrarClienteUseCase,
    useFactory: (clienteGateway: IClienteGateway, authGateway: IAuthenticationGateway) =>
      new CadastrarClienteUseCase(clienteGateway, authGateway),
    inject: [IClienteGateway]
  }
]

const controllerProviders: Provider[] = [
  {
    provide: CadastrarClienteController,
    useFactory: (cadastrarClienteUseCase: CadastrarClienteUseCase) => new CadastrarClienteController(cadastrarClienteUseCase),
    inject: [CadastrarClienteUseCase]
  }
]

@Module({
  imports: [],
  controllers: [ClienteControllerRoute],
  providers: [
    ...persistenceProviders,
    ...useCaseProviders,
    ...controllerProviders
  ],
})
export class ClienteModule { }