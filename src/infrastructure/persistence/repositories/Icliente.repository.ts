import { Cliente } from "src/core/cliente/entity/cliente.entity";

/**
 * Interface para Cliente Repository
 */
export interface IClienteRepository {
  cadastrar(cliente: Cliente): Promise<Cliente>;
  getCliente(cpfOrEmail: string): Promise<Cliente[] | null>;
  excluirCliente(cpf: string): Promise<void>
}

export const IClienteRepository = Symbol('IClienteRepository');
