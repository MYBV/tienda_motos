//###################################################################################
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { RabbitMQ } from './constant';
//###################################################################################

//###################################################################################
async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      urls: process.env.AMQP_URL,
      queue: RabbitMQ.CustomerQueue,
    },
  });

  app.useGlobalFilters(new AllExceptionFilter());
  await app.listen();
  console.log('MS Customers is listening');
}
//###################################################################################

//###################################################################################
bootstrap();
//###################################################################################
