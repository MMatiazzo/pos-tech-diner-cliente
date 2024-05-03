import { BadRequestException, Inject } from "@nestjs/common";
import { CriaClienteDto } from "../../dto/cria-cliente.dto";
import { IClienteGateway } from "src/application/operation/gateways/cliente/Icliente.gateway";
import { Cliente } from "../../entity/cliente.entity";
import { IAuthenticationGateway } from "src/application/operation/gateways/authentication/Iauthentication.gateway";

export class CadastrarClienteUseCase {
  constructor(
    @Inject(IClienteGateway)
    private clienteGateway: IClienteGateway,

    @Inject(IAuthenticationGateway)
    private authenticationGateway: IAuthenticationGateway,
  ) { }

  async execute({ nome, email, cpf, senha }: CriaClienteDto): Promise<any> {

    if (!email || !nome || !cpf || !senha) {
      throw new BadRequestException('email, nome, cpf, cadastrar e senha são campos obrigatórios');
    }

    const cliente = Cliente.new({ nome, email, cpf, senha });
    const clienteCadastrado = await this.clienteGateway.cadastrarCliente(cliente);

    const autenticacaoCriada = await this.authenticationGateway.registrar(
      clienteCadastrado.nome,
      clienteCadastrado.email,
      senha,
    );

    if (!autenticacaoCriada?.UserConfirmed) {
      throw new BadRequestException(`Não foi possível cadastrar usuário: ${autenticacaoCriada?.message}`);
    }

    const token = await this.authenticationGateway.autenticar(clienteCadastrado.nome, senha);

    return token;
  }
}