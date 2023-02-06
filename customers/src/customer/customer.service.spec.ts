import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { CustomerService } from './customer.service';
import { CUSTOMER } from '../common/models/models';
import { CustomerSchema } from './schema/customer.schema';

describe('CustomerService', () => {
  let service: CustomerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: ['.env.development'],
          isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.URI_MONGODBTEST, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }),

        MongooseModule.forFeatureAsync([
          {
            name: CUSTOMER.name,
            useFactory: () => CustomerSchema,
          },
        ]),
      ],
      providers: [CustomerService],
    }).compile();

    service = module.get<CustomerService>(CustomerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Pruebas para MS de Clientes', () => {
    let cliente_id = '';
    it('Debe crearse un cliente', async () => {
      let body_prueba = {
        name: 'Martha Gomez',
        dni: 'P15267894',
        email: 'marthagomez@correo.com',
      };

      let resultado = await service.create_customer(body_prueba);
      console.log('prueba crear cliente (este debe ser exitoso)');
      console.log(resultado);
      expect(resultado.status).toBe(201);
    });

    it('Consultar clientes', async () => {
      let resultado = await service.find_customers();
      console.log('prueba consultar clientes');
      console.log(resultado);
      cliente_id = resultado[0]['_id'];
      console.log('cliente_id ', cliente_id);
      expect(resultado.length).toBeLessThanOrEqual(1);
    });

    it('Consultar un cliente por id', async () => {
      let resultado = await service.find_customer(cliente_id);
      console.log('prueba consulta cliente por id');
      console.log(resultado);
      expect(resultado).toHaveProperty('dni');
    });

    it('Al intentar crear nuevamente el cliente anterior -debe fallar-', async () => {
      let body_prueba = {
        name: 'Martha Gomez',
        dni: 'P15267894',
        email: 'marthagomez@correo.com',
      };

      let resultado = await service.create_customer(body_prueba);
      console.log('prueba crear cliente repetido (dni) -debe fallar-');
      console.log(resultado);
      expect(resultado.status).toBe(400);
    });

    it('Intentar crear un cliente con un email registrado -debe fallar-', async () => {
      let body_prueba = {
        name: 'Carlos Posada',
        dni: 'P15267587',
        email: 'marthagomez@correo.com',
      };

      let resultado = await service.create_customer(body_prueba);
      console.log('prueba crear cliente con email registrado -debe fallar-');
      console.log(resultado);
      expect(resultado.status).toBe(400);
    });

    it('Intentar crear un cliente con un dni menor a 8 caracteres -debe fallar-', async () => {
      let body_prueba = {
        name: 'Carlos Posada',
        dni: 'P152',
        email: 'carlosposada@correo.com',
      };

      let resultado = await service.create_customer(body_prueba);
      console.log(
        'prueba crear cliente con un dni menor a 8 caracteres -debe fallar-',
      );
      console.log(resultado);
      expect(resultado.status).toBe(400);
    });

    it('Intentar crear un cliente con un email inavalido -debe fallar-', async () => {
      let body_prueba = {
        name: 'Carlos Posada',
        dni: 'P15267587',
        email: 'carlosposadacorreo.com',
      };

      let resultado = await service.create_customer(body_prueba);
      console.log('prueba crear cliente con email inavalido -debe fallar-');
      console.log(resultado);
      expect(resultado.status).toBe(400);
    });

    it('Actualizar un cliente', async () => {
      let body_prueba = {
        name: 'Martha Gomez',
        email: 'gomezmartha@correo.com',
      };

      let resultado = await service.update_customer(cliente_id, body_prueba);
      console.log('prueba modificar cliente');
      console.log(resultado);
      expect(resultado.status).toBe(200);
    });

    it('Eliminar un cliente', async () => {
      let resultado = await service.delete_customer(cliente_id);
      console.log('prueba eliminar cliente');
      console.log(resultado);
      expect(resultado.status).toBe(200);
    });
  });
});
