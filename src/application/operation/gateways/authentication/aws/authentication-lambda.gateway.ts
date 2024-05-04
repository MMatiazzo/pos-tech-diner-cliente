import { env } from "process";
import { IAuthenticationGateway } from '../Iauthentication.gateway';
import { cognitoApi } from "src/shared/axios/api";
import { BadRequestException } from "@nestjs/common";

export class CognitoAuth implements IAuthenticationGateway {
  async registrar(username: string, email: string, senha: string) {
    const requestBody = {
      "ClientId": env.COGNITO_CLIENT_ID,
      "Password": senha,
      "Username": username,
      "UserAttributes": [
        {
          "Name": "email",
          "Value": email
        }
      ]
    }

    const { data } = await cognitoApi.post('/', { ...requestBody }, {
      headers: {
        'X-Amz-Target': env.COGNITO_HEADER_SIGNUP
      }
    });

    return data;
  }

  async autenticar(nome: string, senha: string): Promise<any> {
    try {
      const requestBody = {
        "AuthFlow": "USER_PASSWORD_AUTH",
        "ClientId": env.COGNITO_CLIENT_ID,
        "AuthParameters": {
          "USERNAME": nome,
          "PASSWORD": senha
        }
      }

      const { data } = await cognitoApi.post('/', { ...requestBody }, {
        headers: {
          'X-Amz-Target': env.GOGNITO_HEADER_SIGNIN
        }
      });

      return data;
    } catch (err) {
      throw new BadRequestException("Cliente não encontrado");
    }
  }
}
