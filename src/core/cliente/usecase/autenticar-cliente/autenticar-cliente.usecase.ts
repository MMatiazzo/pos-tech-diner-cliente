import { BadRequestException, Inject } from "@nestjs/common";
import { AutenticaClienteDto } from "../../dto/autentica-cliente.dto";
import { IClienteGateway } from "../../../../application/operation/gateways/cliente/Icliente.gateway";
import { IAuthenticationGateway } from "../../../../application/operation/gateways/authentication/Iauthentication.gateway";
import { env } from "process";

export class AutenticarClienteUseCase {
  constructor(
    @Inject(IClienteGateway)
    private clienteGateway: IClienteGateway,
    @Inject(IAuthenticationGateway)
    private autenticationGateway: IAuthenticationGateway
  ) { }

  async execute({ nome, email, cpf, senha, autenticar }: AutenticaClienteDto): Promise<any> {

    if (!autenticar) {
      return this.autenticationGateway.autenticar(env.DEFAULT_USER_NOME, env.DEFAULT_USER_SENHA);
    }

    const cpfOrEmail = email || cpf.replace(/[^\d]/g, '');

    if ((!email && !cpf) || !senha) {
      throw new BadRequestException('Não podemos criar um usuario sem email, cpf e/ou senha não estão preenchidos');
    }

    const cliente = await this.clienteGateway.getCliente(cpfOrEmail);

    if (!cliente) {
      throw new BadRequestException('Cliente não encontrado');
    }

    const token = await this.autenticationGateway.autenticar(cliente.nome, senha);

    return token;
  }
}