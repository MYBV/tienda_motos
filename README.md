# API prueba credito tienda motos

Backend para gestionar data y endpoints de una tienda de motos que ofrece credito a sus clientes. 🏬



Se compone en esencia de un módulo principal (carpeta api-gateway) y tres módulos operativos:
    - Usuarios (carpeta `users` 👥)
    - Clientes (capeta `customers` 🎎)
    - Pagos (carpeta `payments` 💸)

🔀 El api-gateway se encarga de recibir las peticiones y redireccionarlas hacia el microservicio (módulo) 
correspondiente a tráves de RabbitMQ 🐰 que en este proyecto actua como un middleware de mensajería 
(implementa estandar AMQP) 💬. La lógica de esta comunicación se encuentra en la carpeta `client-proxy`.
Desde este módulo principal no existe escritura sobre la BD, ya que esta lógica se desarrolla en cada microservicio.

👥 El microservicio de usuarios permite manejar la lógica de BD para la colección users. Esto permite realizar el CRUD 
básico y la autenticación 🔐.

🎎 El microservicio de clientes permite manejar la lógica de BD para la colección customers. Al crear un cliente este 
tendrá por defecto su crédito en cero, luego desde los pagos puede recibir un prestámo o abonar a su deuda.

💸 El microservicio de pagos permite manejar la lógica de BD para la colección payments, la cual tiene un campo que permite 
identificar la lógica de la operación a realizar (PRESTAMO/ABONO). Al crear un pago se debe 
indicar el id del cliente al que se le asignará, si es un pago de tipo `prestamo` se agregará a deuda (será negativo) 
por el contrario si es un pago tipo `abono` será una operación de suma.

El proyecto tiene una pequeña documentación con Swagger 📚.

## Construido con 🛠️

* [MongoDB](https://www.mongodb.com/) - Gestor base de datos.
* [Nodejs](https://nodejs.org)
* [Nestjs](https://docs.nestjs.com/) - Framework de nodejs utilizado.
* [npm](https://www.npmjs.com/) - Permite instalar diversas librerías utilizadas en el proyecto.
* [rabbitmq](https://www.rabbitmq.com/) - Ssoftware de negociación de mensajes de código abierto.


## Deploy 🚀
_Ejecuta los siguientes pasos en orden:_

## Deploy desde github

### Paso 1 Clona el repositorio: 

  ```$ git clone https://github.com/MYBV/tienda_motos.git``` ⏬

### Paso 2 Entra a la carpeta de cada microservicio se descargo ejecuta el siguiente comando:
  
  ```$ npm install``` 📂	

Ya con estos dos pasos se tiene el código del proyecto y se instalan las dependencias.

### Paso 3 Runner del proyecto:

    Entra a la carpeta de cada microservicio y ejecuta en cada uno.

  ```$ npm run start:dev```

Con este comando se inicia el proyecto en modo dev.

## Dockerizando 🐋
Si se desea utilizar docker para utilizar el server, seguir los siguientes pasos:

  - Instala Docker y Docker compose.
  - Inicia el servicio de docker.
  - Ve a la carpeta del raíz proyecto cd /tienda_motos.
  - Construye el compose con el siguiente comando: ```docker-compose up -d```.
  - Después de iniciar el servicio visita la url en el navegador `http://localhost/api/docs`.

## AWS con Serverless ☁️
El archivo `serverless.yml` permite crear una instancia EC2 con ubuntu server y define la salida y acceso 
a la misma instancia mediante SSH, HTTP y HTTPS, además deja instalado `docker` y `docker-compose` 
y realiza el git clone de los archivos `docker-compose.yml` y `.env`. Para utilizar este método de despliegue 
se debe contar con una cuenta en AWS y las accesKeys con su Nombre de la clave correspondientes 
(por ejemplo para probarlas he creado un nomber de clave = tiendamotos, si se utiliza otra KeyName debe sustituirse 
por su respectivo valor en el archivo serverless.yml), deben seguirse los siguientes pasos:

- Instalar el framework de serverless. `sudo npm -g serverless`
- Configurar las keys con el siguiente comando: 
   ```serverless config credentials --provider aws --key AKIAIOSFODNN7EXAMPLE --secret wJalrXUtnFEMI/K7MDENG/bPxRfiCYEXAMPLEKEY```
   (sustituye por tus respectivas llaves)
- Ejecuta el comando ```sls deploy``` para crear la instancia EC en AWS.
- Ingresa a tu console de AWS y conectate a la instancia creada.
- Dentro de la instancia ejecuta ```cd /home/ubuntu/mstienda_motos/archivos_prueba```.
- Luego dentro de la misma instancia ejecuta ```sudo docker-compose up -d``` y espera a que se contruyan los servicios.
- Accede al api desde la ipV4 pública que proporciona AWS para la instancia para acceder a la ruta de Swagger, por ejemplo: 
`http://34.207.121.7/api/docs`

## Pre-requisitos 📋

_Necesitas instalar lo siguiente:_ ⚠️

### Pre-requisitos 1
* Instala Nodejs

### Pre-requisitos 2
* Instala el cliente de nestjs ```npm i -g @nestjs/cli```.

### Pre-requisitos 3
* Instala MongoDB.



## Ruta Swagger 🔗
- `http://localhost:3000/api/docs`, si se utiliza docker sería `http://localhost/api/docs`

## Pruebas 🚥
Puedes realizar pruebas unitarias de los servicios de usuarios y clientes. Para ello ingresa a la 
carpeta correspondiente y ejecuta el siguiente comando ```npm run test:watch``` ✅.

## Autor ✒️

* **Mayla Bautista** - [@bautista_mayla](#Des_Mayla) 👤.