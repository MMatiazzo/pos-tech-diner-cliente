# 📁 CLIENTE ms

# Micro serviço de cliente

<br>
Utilizar a branch principal `master`
<br>
Substituir a váriavel DATABASE_URL com a connection string postgresdb
<br>
Executar o comando `npm run start:dev`

##### A collection com os requests está no arquivo `micro-services.postman_collection.json` na pasta `CLIENTE`

## End-point: cadastrar-usuario
#### End-point para fazer o cadastro de um usuário
### Method: POST
>```
>http://localhost:3332/cliente/cadastrar
>```
### Body (**raw**)

```json
{
    "cpf": "248.031.690-47",
    "nome": "usuarioteste4",
    "email": "usuarioteste4@email.com.br",
    "senha": "zD)c9FM89[7+"
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: autenticar-usuario
#### End-point para fazer autenticação de um usuário
### Method: POST
>```
>http://localhost:3332/cliente/autenticar
>```
### Body (**raw**)

```json
{
    "cpf": "24803169047",
    "senha": "pass",
    "autenticar": true
}
```


⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃ ⁃

## End-point: retornar-usuario
#### End-point para retornar um usuário pelo access-token
### Method: POST
>```
>http://localhost:3332/cliente/decodificar-acessToken
>```
### Body (**raw**)

```json
{
    "acessToken": "xxxxxx"
}
```
