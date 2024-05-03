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

  async getCliente(cpfOrEmail: string): Promise<Cliente> {
    try {
      const cliente = await this.prisma.cliente.findMany({
        where: {
          OR: [
            {
              email: cpfOrEmail
            },
            { cpf: cpfOrEmail },
          ]
        },
      });

      return cliente[0];
    } catch (e) {
      console.error('error prisma => ', e);
    }
  }
} 