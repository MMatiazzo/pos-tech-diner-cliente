import * as AWS from 'aws-sdk';
import { env } from "process";
import { IAuthenticationGateway } from '../Iauthentication.gateway';

export class AuthLambda implements IAuthenticationGateway {
  async authorization(
    cpf: string,
    senha: string,
    registrar: boolean,
    username: string | null,
    email: string | null,
  ) {

    console.log('PRINT NAS ENVS');
    console.log('env.MY_AWS_REGION => ', env.MY_AWS_REGION);
    console.log('env.AWS_LAMBDA_SDK_ACCESS_KEY => ', env.AWS_LAMBDA_SDK_ACCESS_KEY);
    console.log('env.AWS_LAMBDA_SECRET_ACCESS_KEY => ', env.AWS_LAMBDA_SECRET_ACCESS_KEY);
    console.log('env.AWS_LAMBDA_FUNCTION_NAME => ', env.AWS_LAMBDA_FUNCTION_NAME);

    AWS.config.update({
      region: env.MY_AWS_REGION,
      accessKeyId: env.AWS_LAMBDA_SDK_ACCESS_KEY,
      secretAccessKey: env.AWS_LAMBDA_SECRET_ACCESS_KEY
    });

    const lambda = new AWS.Lambda();

    const params = {
      FunctionName: env.AWS_LAMBDA_FUNCTION_NAME,
      Payload: JSON.stringify({
        cpf,
        password: senha,
        signup: registrar,
        username,
        email
      })
    };

    const token = await lambda.invoke(params).promise();

    return token;
  }
}
