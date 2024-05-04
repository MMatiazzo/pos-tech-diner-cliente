import { Inject } from "@nestjs/common";
import { AutenticaClienteDto } from "src/core/cliente/dto/autentica-cliente.dto";
import { CadastrarClienteUseCase } from "src/core/cliente/usecase/cadastrar-cliente/cadastrar-cliente.usecase";

export class CadastrarClienteController {
  constructor(
    @Inject(CadastrarClienteUseCase)
    private cadastrarClienteUseCase: CadastrarClienteUseCase
  ) { }

  async handle(payload: AutenticaClienteDto): Promise<any> {
    const response = await this.cadastrarClienteUseCase.execute(payload);
    return response;
  }
}