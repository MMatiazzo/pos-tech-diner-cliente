import { Cliente } from "src/core/cliente/entity/cliente.entity";

export interface IClienteGateway {
  cadastrarCliente(cliente: Cliente): Promise<Cliente>;
  getCliente(cpfOrEmail: string): Promise<Cliente>;
  excluirCliente(email: string): Promise<void>
}

export const IClienteGateway = Symbol('IClienteGateway');