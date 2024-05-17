import { BadRequestException, Inject } from "@nestjs/common";
import { AutenticaClienteDto } from "../../dto/autentica-cliente.dto";
import { IClienteGateway } from "../../../../application/operation/gateways/cliente/Icliente.gateway";
import { Cliente } from "../../entity/cliente.entity";
import { IAuthenticationGateway } from "../../../../application/operation/gateways/authentication/Iauthentication.gateway";

export class CadastrarClienteUseCase {
  constructor(
    @Inject(IClienteGateway)
    private clienteGateway: IClienteGateway,

    @Inject(IAuthenticationGateway)
    private authenticationGateway: IAuthenticationGateway,
  ) { }

  async execute({ nome, email, cpf, senha }: AutenticaClienteDto): Promise<any> {

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

    console.log('autenticacaoCriada => ', autenticacaoCriada);
    if (!autenticacaoCriada?.UserConfirmed) {
      throw new BadRequestException(`Não foi possível cadastrar usuário: ${autenticacaoCriada?.message}`);
    }

    const token = await this.authenticationGateway.autenticar(clienteCadastrado.nome, senha);

    return token;
  }
}