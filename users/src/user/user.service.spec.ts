import { UserService } from './user.service';
import { Test, TestingModule } from '@nestjs/testing';
import { MongooseModule } from '@nestjs/mongoose';
import { USER } from '../common/models/models';
import { UserSchema } from './schema/user.schema';
import { ConfigModule } from '@nestjs/config';

describe('UserService', () => {
  let service: UserService;

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
            name: USER.name,
            useFactory: () => UserSchema,
          },
        ]),
      ],
      providers: [UserService],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Pruebas para MS de Usuarios', () => {
    let token = '';
    let usuario_id = '';
    it('Debe crearse un usuario', async()=>{
      let body_prueba = {
        "name": "Luisa Lane",
        "username": "luisalane",
        "email": "luisalane@correo.com",
        "password": "laneluisa"
      }

      let resultado = await service.create_user(body_prueba)
      console.log('prueba crear usuario (este debe ser exitoso)')
      console.log(resultado)
      expect(resultado.status).toBe(201);
    })

    it('Consultar usuarios', async () => {
      let resultado = await service.find_users();
      console.log('prueba consultar usuarios');

      usuario_id = resultado[0]['_id'];
      console.log('usuario_id ', usuario_id);
      expect(resultado.length).toBeLessThanOrEqual(1);
    });

    it('Consultar un usuario por id', async () => {
      let resultado = await service.find_user(usuario_id);
      console.log('prueba consulta usuario por id');
      expect(resultado).toHaveProperty('username');
    });
    
    it('Al intentar crear nuevamente el usuario anterior -debe fallar-', async()=>{
      let body_prueba = {
        "name": "Luisa Lane",
        "username": "luisalane",
        "email": "luisalane@correo.com",
        "password": "laneluisa"
      }

      let resultado = await service.create_user(body_prueba)
      console.log('prueba crear usuario repetido (login) -debe fallar-')
      console.log(resultado)
      expect(resultado.status).toBe(400);
    })

    it('Intentar crear un usuario con un email registrado -debe fallar-', async()=>{
      let body_prueba = {
        "name": "Carlos Posada",
        "username": "posadacarlos",
        "email": "luisalane@correo.com",
        "password": "carlosposada"
      }

      let resultado = await service.create_user(body_prueba)
      console.log('prueba crear usuario con email registrado -debe fallar-')
      console.log(resultado)
      expect(resultado.status).toBe(400);
    })

    it('Intentar crear un usuario con un username menor a 8 caracteres -debe fallar-', async()=>{
      let body_prueba = {
        "name": "Carlos Posada",
        "username": "posada",
        "email": "carlosposada@correo.com",
        "password": "carlosposada"
      }

      let resultado = await service.create_user(body_prueba)
      console.log('prueba crear usuario con un username menor a 8 caracteres -debe fallar-')
      console.log(resultado)
      expect(resultado.status).toBe(400);
    })

    it('Intentar crear un usuario con un email inavalido -debe fallar-', async()=>{
      let body_prueba = {
        "name": "Carlos Posada",
        "username": "posadacarlos",
        "email": "carlosposada.com",
        "password": "carlosposada"
      }

      let resultado = await service.create_user(body_prueba)
      console.log('prueba crear usuario con email inavalido -debe fallar-')
      console.log(resultado)
      expect(resultado.status).toBe(400);
    })

    it('Actualizar un usuario', async () => {
      let body_prueba = {
        name: 'Luisa Lane',
        email: 'laneluisa@correo.com',
        password: 'laneluisa',
      };

      let resultado = await service.update_user(usuario_id, body_prueba);
      console.log('prueba modificar usuario');
      console.log(resultado)
      expect(resultado.status).toBe(200);
    });

    it('Eliminar un usuario', async () => {

      let resultado = await service.delete_user(usuario_id);
      console.log('prueba eliminar usuario');
      console.log(resultado)
      expect(resultado.status).toBe(200);
    });
  });
});
