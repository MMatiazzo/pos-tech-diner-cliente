import { BadRequestException } from "@nestjs/common";
import { CriaClienteDto } from "../dto/cria-cliente.dto";
import { Cpf } from "./cpf.entity";

export class Cliente {
  cpf: string;
  nome: string;
  email: string;

  private constructor(payload: CriaClienteDto) {
    this.cpf = payload.cpf;
    this.nome = payload.nome;
    this.email = payload.email;
  }

  public static new(payload: CriaClienteDto): Cliente {
    if (payload.cpf) {
      const isValid: boolean = Cpf.validaCpf(payload.cpf);
      if (!isValid) throw new BadRequestException("CPF inválido");
    }

    const cliente = new Cliente({ ...payload, cpf: payload.cpf.replace(/[^\d]/g, '') });
    return cliente;
  }
}
