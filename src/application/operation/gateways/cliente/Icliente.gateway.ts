import { Cliente } from "src/core/cliente/entity/cliente.entity";

export interface IClienteGateway {
  cadastrarCliente(cliente: Cliente): Promise<Cliente>;
}

export const IClienteGateway = Symbol('IClienteGateway');