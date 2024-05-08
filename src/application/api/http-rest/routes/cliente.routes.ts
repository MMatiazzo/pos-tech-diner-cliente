import { Body, Controller, Get, HttpCode, Inject, Post } from '@nestjs/common';
import { AutenticarClienteController } from 'src/application/operation/controllers/autenticar-cliente.controller';

import { CadastrarClienteController } from 'src/application/operation/controllers/cadastrar-cliente.controller';
import { DecodificarTokenClienteController } from 'src/application/operation/controllers/decodificar-token-cliente.controller';
import { AutenticaClienteDto } from 'src/core/cliente/dto/autentica-cliente.dto';
import { DecodificarTokenClienteDto } from 'src/core/cliente/dto/decodificar-token-cliente.dto';

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
