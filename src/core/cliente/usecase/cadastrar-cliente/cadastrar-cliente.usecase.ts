import { BadRequestException, Inject } from "@nestjs/common";
import { CriaClienteDto } from "../../dto/cria-cliente.dto";
import { IClienteGateway } from "src/application/operation/gateways/cliente/Icliente.gateway";
import { Cliente } from "../../entity/cliente.entity";
import { IAuthenticationGateway } from "src/application/operation/gateways/authentication/Iauthentication.gateway";

export class CadastrarClienteUseCase {
  constructor(
    @Inject(IClienteGateway)
    private clienteGateway: IClienteGateway,

    @Inject(IAuthenticationGateway)
    private authenticateGateway: IAuthenticationGateway,
  ) { }

  async execute({ nome, email, cpf, cadastrar, senha }: CriaClienteDto): Promise<any> {

    if (!email || !nome || !cpf || cadastrar === undefined || !senha) {
      throw new BadRequestException('email, nome, cpf, cadastrar e senha são campos obrigatórios');
    }

    const cliente = Cliente.new({ nome, email, cpf, cadastrar, senha });
    const clienteCadastrado = await this.clienteGateway.cadastrarCliente(cliente);

    // const token = await this.authenticateGateway.authorization(
    //   clienteCadastrado.cpf,
    //   senha,
    //   cadastrar,
    //   clienteCadastrado.nome,
    //   clienteCadastrado.email,
    // );

    return clienteCadastrado;
  }
}