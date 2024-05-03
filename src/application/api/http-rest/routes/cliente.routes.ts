import { Body, Controller, HttpCode, Inject, Post } from '@nestjs/common';

import { CadastrarClienteController } from 'src/application/operation/controllers/cadastrar-cliente.controller';
import { CriaClienteDto } from 'src/core/cliente/dto/cria-cliente.dto';

@Controller('/cliente')
export class ClienteControllerRoute {

  constructor(
    @Inject(CadastrarClienteController)
    private cadastrarClienteController: CadastrarClienteController,
  ) { }

  @Post('/cadastrar')
  @HttpCode(200)
  async cadastrar(
    @Body() payload: CriaClienteDto
  ): Promise<void> {
    const token = await this.cadastrarClienteController.handle(payload);
    return token;
  }
}
