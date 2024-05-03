export interface IAuthenticationGateway {
  authorization(
    cpf: string,
    senha: string,
    cadastrar: boolean,
    username: string | null,
    email: string | null
  ): Promise<any>;
}

export const IAuthenticationGateway = Symbol('IAuthenticationGateway');
