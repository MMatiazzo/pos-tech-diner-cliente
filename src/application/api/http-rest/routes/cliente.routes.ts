import { Body, Controller, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { AutenticarClienteController } from '../../../../application/operation/controllers/autenticar-cliente.controller';

import { CadastrarClienteController } from '../../../../application/operation/controllers/cadastrar-cliente.controller';
import { DecodificarTokenClienteController } from '../../../../application/operation/controllers/decodificar-token-cliente.controller';
import { AutenticaClienteDto } from '../../../../core/cliente/dto/autentica-cliente.dto';
import { DecodificarTokenClienteDto } from '../../../../core/cliente/dto/decodificar-token-cliente.dto';

// deploy trigger

@Controller('/cliente')
export class ClienteControllerRoute {

  constructor(
    @Inject(CadastrarClienteController)
    private cadastrarClienteController: CadastrarClienteController,

    @Inject(AutenticarClienteController)
    private autenticarClienteController: AutenticarClienteController,

    @Inject(DecodificarTokenClienteController)
    private decodificarTokenClienteController: DecodificarTokenClienteController,
  ) { }

  @Get('/')
  healthCheck(): any {
    return { health: true }
  }

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

  @Post('/decodificar-acessToken')
  @HttpCode(200)
  async decodificarToken(
    @Body() payload: DecodificarTokenClienteDto
  ): Promise<any> {
    const token = await this.decodificarTokenClienteController.handle(payload);
    return token;
  }
}
