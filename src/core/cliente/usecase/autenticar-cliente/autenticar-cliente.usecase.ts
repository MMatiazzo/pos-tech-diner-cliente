import { BadRequestException, Inject } from "@nestjs/common";
import { AutenticaClienteDto } from "../../dto/autentica-cliente.dto";
import { IClienteGateway } from "src/application/operation/gateways/cliente/Icliente.gateway";
import { IAuthenticationGateway } from "src/application/operation/gateways/authentication/Iauthentication.gateway";

export class AutenticarClienteUseCase {
  constructor(
    @Inject(IClienteGateway)
    private clienteGateway: IClienteGateway,
    @Inject(IAuthenticationGateway)
    private autenticationGateway: IAuthenticationGateway
  ) { }

  async execute({ nome, email, cpf, senha }: AutenticaClienteDto): Promise<any> {

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