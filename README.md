# API prueba credito tienda motos

Backend para gestionar data y endpoints de una tienda de motos que ofrece credito a sus clientes. 馃彫



Se compone en esencia de un m贸dulo principal (carpeta api-gateway) y tres m贸dulos operativos:
    - Usuarios (carpeta `users` 馃懃)
    - Clientes (capeta `customers` 馃帋)
    - Pagos (carpeta `payments` 馃捀)

馃攢 El api-gateway se encarga de recibir las peticiones y redireccionarlas hacia el microservicio (m贸dulo) 
correspondiente a tr谩ves de RabbitMQ 馃惏 que en este proyecto actua como un middleware de mensajer铆a 
(implementa estandar AMQP) 馃挰. La l贸gica de esta comunicaci贸n se encuentra en la carpeta `client-proxy`.
Desde este m贸dulo principal no existe escritura sobre la BD, ya que esta l贸gica se desarrolla en cada microservicio.

馃懃 El microservicio de usuarios permite manejar la l贸gica de BD para la colecci贸n users. Esto permite realizar el CRUD 
b谩sico y la autenticaci贸n 馃攼.

馃帋 El microservicio de clientes permite manejar la l贸gica de BD para la colecci贸n customers. Al crear un cliente este 
tendr谩 por defecto su cr茅dito en cero, luego desde los pagos puede recibir un prest谩mo o abonar a su deuda.

馃捀 El microservicio de pagos permite manejar la l贸gica de BD para la colecci贸n payments, la cual tiene un campo que permite 
identificar la l贸gica de la operaci贸n a realizar (PRESTAMO/ABONO). Al crear un pago se debe 
indicar el id del cliente al que se le asignar谩, si es un pago de tipo `prestamo` se agregar谩 a deuda (ser谩 negativo) 
por el contrario si es un pago tipo `abono` ser谩 una operaci贸n de suma.

El proyecto tiene una peque帽a documentaci贸n con Swagger 馃摎.

## Construido con 馃洜锔?

* [MongoDB](https://www.mongodb.com/) - Gestor base de datos.
* [Nodejs](https://nodejs.org)
* [Nestjs](https://docs.nestjs.com/) - Framework de nodejs utilizado.
* [npm](https://www.npmjs.com/) - Permite instalar diversas librer铆as utilizadas en el proyecto.
* [rabbitmq](https://www.rabbitmq.com/) - Ssoftware de negociaci贸n de mensajes de c贸digo abierto.


## Deploy 馃殌
_Ejecuta los siguientes pasos en orden:_

## Deploy desde github

### Paso 1 Clona el repositorio: 

  ```$ git clone https://github.com/MYBV/tienda_motos.git``` 鈴?

### Paso 2 Entra a la carpeta de cada microservicio se descargo ejecuta el siguiente comando:
  
  ```$ npm install``` 馃搨	

Ya con estos dos pasos se tiene el c贸digo del proyecto y se instalan las dependencias.

### Paso 3 Runner del proyecto:

    Entra a la carpeta de cada microservicio y ejecuta en cada uno.

  ```$ npm run start:dev```

Con este comando se inicia el proyecto en modo dev.

## Dockerizando 馃悑
Si se desea utilizar docker para utilizar el server, seguir los siguientes pasos:

  - Instala Docker y Docker compose.
  - Inicia el servicio de docker.
  - Ve a la carpeta del ra铆z proyecto cd /tienda_motos.
  - Construye el compose con el siguiente comando: ```docker-compose up -d```.
  - Despu茅s de iniciar el servicio visita la url en el navegador `http://localhost/api/docs`.

## AWS con Serverless 鈽侊笍
El archivo `serverless.yml` permite crear una instancia EC2 con ubuntu server y define la salida y acceso 
a la misma instancia mediante SSH, HTTP y HTTPS, adem谩s deja instalado `docker` y `docker-compose` 
y realiza el git clone de los archivos `docker-compose.yml` y `.env`. Para utilizar este m茅todo de despliegue 
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
- Accede al api desde la ipV4 p煤blica que proporciona AWS para la instancia para acceder a la ruta de Swagger, por ejemplo: 
`http://34.207.121.7/api/docs`

## Pre-requisitos 馃搵

_Necesitas instalar lo siguiente:_ 鈿狅笍

### Pre-requisitos 1
* Instala Nodejs

### Pre-requisitos 2
* Instala el cliente de nestjs ```npm i -g @nestjs/cli```.

### Pre-requisitos 3
* Instala MongoDB.



## Ruta Swagger 馃敆
- `http://localhost:3000/api/docs`, si se utiliza docker ser铆a `http://localhost/api/docs`

## Pruebas 馃殽
Puedes realizar pruebas unitarias de los servicios de usuarios y clientes. Para ello ingresa a la 
carpeta correspondiente y ejecuta el siguiente comando ```npm run test:watch``` 鉁?.

## Autor 鉁掞笍

* **Mayla Bautista** - [@bautista_mayla](#Des_Mayla) 馃懁.