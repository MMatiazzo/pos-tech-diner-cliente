import { Cliente } from "src/core/cliente/entity/cliente.entity";
import { IClienteGateway } from "./Icliente.gateway";
import { Inject } from "@nestjs/common";
import { IClienteRepository } from "src/infrastructure/persistence/repositories/Icliente.repository";

export class ClienteGateway implements IClienteGateway {

  constructor(
    @Inject(IClienteRepository)
    private clienteRepository: IClienteRepository
  ) { }

  async cadastrarCliente(cliente: Cliente): Promise<Cliente> {
    return this.clienteRepository.cadastrar(cliente);
  }

  async getCliente(cpfOrEmail: string): Promise<Cliente> {
    const clientes = await this.clienteRepository.getCliente(cpfOrEmail);
    if (!clientes.length) {
      return null
    }

    return clientes[0];
  }
}