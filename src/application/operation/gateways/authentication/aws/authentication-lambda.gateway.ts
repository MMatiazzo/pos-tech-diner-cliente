import { env } from "process";
import { IAuthenticationGateway } from '../Iauthentication.gateway';

export class CognitoAuth implements IAuthenticationGateway {
  async registrar(username: string | null, email: string | null, senha: string) {
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

    const response = await fetch(env.COGNITO_URL, {
      method: "post",
      body: JSON.stringify(requestBody),
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/x-amz-json-1.1',
        'Connection': 'keep-alive',
        'X-Amz-Target': env.COGNITO_HEADER_SIGNUP
      }
    });

    const responseJson = await response.json();
    return responseJson;
  }

  async autenticar(nome: string, senha: string): Promise<any> {
    const requestBody = {
      "AuthFlow": "USER_PASSWORD_AUTH",
      "ClientId": env.COGNITO_CLIENT_ID,
      "AuthParameters": {
        "USERNAME": nome,
        "PASSWORD": senha
      }
    }

    const response = await fetch(env.COGNITO_URL, {
      method: "post",
      body: JSON.stringify(requestBody),
      headers: {
        'Accept-Encoding': 'gzip, deflate, br',
        'Content-Type': 'application/x-amz-json-1.1',
        'Connection': 'keep-alive',
        'X-Amz-Target': env.GOGNITO_HEADER_SIGNIN
      }
    });

    const responseJson = await response.json();
    return responseJson;
  }
}
