export class ClientePresenter {
  static async decodeTokenToUser(token: any) {
    const email = token.UserAttributes.find(useratt => useratt.Name === "email");

    return {
      nome: token.Username,
      email: email.Value
    }
  }
}