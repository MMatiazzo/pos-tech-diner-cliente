import { BadRequestException, Inject } from "@nestjs/common";
import { CriaClienteDto } from "../../dto/cria-cliente.dto";
import { IClienteGateway } from "src/application/operation/gateways/cliente/Icliente.gateway";

export class AutenticarClienteUseCase {
  constructor(
    @Inject(IClienteGateway)
    private clienteGateway: IClienteGateway
  ) { }

  async execute({ nome, email, cpf }: CriaClienteDto): Promise<any> {

    if (!email || !nome) {
      throw new BadRequestException('Não podemos criar um usuario sem nome e/ou email');
    }

    return this.clienteGateway.cadastrarCliente({ nome, email, cpf });
  }
}