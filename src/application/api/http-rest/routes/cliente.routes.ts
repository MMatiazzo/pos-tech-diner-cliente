import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';
import { AutenticarClienteController } from 'src/application/operation/controllers/autenticar-cliente.controller';

import { CadastrarClienteController } from 'src/application/operation/controllers/cadastrar-cliente.controller';
import { AutenticaClienteDto } from 'src/core/cliente/dto/autentica-cliente.dto';

@Controller('/cliente')
export class ClienteControllerRoute {

  constructor(
    @Inject(CadastrarClienteController)
    private cadastrarClienteController: CadastrarClienteController,

    @Inject(AutenticarClienteController)
    private autenticarClienteController: AutenticarClienteController,
  ) { }

  @Post('/cadastrar')
  @HttpCode(200)
  async cadastrar(
    @Body() payload: AutenticaClienteDto
  ): Promise<void> {
    const token = await this.cadastrarClienteController.handle(payload);
    return token;
  }

  @Post('/autenticar')
  @HttpCode(200)
  async autenticar(
    @Body() payload: AutenticaClienteDto
  ): Promise<any> {
    const token = await this.autenticarClienteController.handle(payload);
    return token;
  }
}
