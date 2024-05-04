import { Cliente } from "src/core/cliente/entity/cliente.entity";

export interface IClienteGateway {
  cadastrarCliente(cliente: Cliente): Promise<Cliente>;
  getCliente(cpfOrEmail: string): Promise<Cliente>;
}

export const IClienteGateway = Symbol('IClienteGateway');