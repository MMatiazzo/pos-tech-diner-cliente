import { AutenticarClienteController } from './autenticar-cliente.controller';
import { AutenticaClienteDto } from '../../../core/cliente/dto/autentica-cliente.dto';
import { AutenticarClienteUseCase } from '../../../core/cliente/usecase/autenticar-cliente/autenticar-cliente.usecase';
import { IClienteGateway } from '../gateways/cliente/Icliente.gateway';
import { IAuthenticationGateway } from '../gateways/authentication/Iauthentication.gateway';

describe('AutenticarClienteController', () => {
    let controller: AutenticarClienteController;
    let useCase: AutenticarClienteUseCase;
    let clienteGateway: IClienteGateway;
    let authGateway: IAuthenticationGateway;

    beforeEach(() => {
        clienteGateway = {} as IClienteGateway;
        authGateway = {} as IAuthenticationGateway;
        useCase = new AutenticarClienteUseCase(clienteGateway, authGateway);
        controller = new AutenticarClienteController(useCase);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('handle', () => {
        it('should call execute method of AutenticarClienteUseCase and return its response', async () => {

            const mockResponse = {
                cpf: "357.956.120-06",
                email: "test@test.com",
                nome: "test",
                senha: "123"
            };
            jest.spyOn(useCase, 'execute').mockResolvedValue(mockResponse);

            const payload: AutenticaClienteDto = {
                autenticar: true,
                cpf: "357.956.120-06",
                email: "test@test.com",
                nome: "test",
                senha: "123"
            };

            const response = await controller.handle(payload);

            expect(useCase.execute).toHaveBeenCalledWith(payload);
            expect(response).toEqual(mockResponse);
        });
    });
});
