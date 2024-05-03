import { Inject } from "@nestjs/common";
import { CriaClienteDto } from "src/core/cliente/dto/cria-cliente.dto";
import { CadastrarClienteUseCase } from "src/core/cliente/usecase/cadastrar-cliente/cadastrar-cliente.usecase";

export class CadastrarClienteController {
  constructor(
    @Inject(CadastrarClienteUseCase)
    private cadastrarClienteUseCase: CadastrarClienteUseCase
  ) { }

  async handle(payload: CriaClienteDto): Promise<any> {
    const response = await this.cadastrarClienteUseCase.execute(payload);
    return response;
  }
}