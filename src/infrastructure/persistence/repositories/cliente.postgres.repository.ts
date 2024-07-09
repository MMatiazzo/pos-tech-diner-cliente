import { Inject, Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Cliente } from "src/core/cliente/entity/cliente.entity";
import { IClienteRepository } from "./Icliente.repository";

@Injectable()
export class ClientePostgresRepository implements IClienteRepository {

  constructor(
    @Inject(PrismaService)
    private prisma: PrismaService
  ) { }

  async cadastrar(cliente: Cliente): Promise<Cliente> {
    const novoCliente = await this.prisma.cliente.create({ data: cliente });
    return novoCliente;
  }

  async getCliente(cpfOrEmail: string): Promise<Cliente[]> {
    try {
      const clientes = await this.prisma.cliente.findMany({
        where: {
          OR: [
            {
              email: cpfOrEmail
            },
            {
              cpf: cpfOrEmail
            },
          ]
        },
      });

      return clientes;
    } catch (e) {
      console.error('error prisma => ', e);
    }
  }

  async excluirCliente(email: string): Promise<void> {
    await this.prisma.cliente.delete({
      where: {
        email
      },
    })
  }
} 