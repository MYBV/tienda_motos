import { TimeOutInterceptor } from './common/interceptors/timeout.interceptor';
import { AllExceptionFilter } from './common/filters/http-exception.filter';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORS } from './constant';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
//#####################################################################################

//#####################################################################################
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors(CORS);
  app.setGlobalPrefix('api/v1/tiendamotos/');

  app.useGlobalFilters(new AllExceptionFilter());
  app.useGlobalInterceptors(new TimeOutInterceptor());

  let options_sw = new DocumentBuilder()
    .setTitle('TiendaMotos API')
    .setDescription('API para TiendaMotos')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  let document_sw = SwaggerModule.createDocument(app, options_sw);

  SwaggerModule.setup('/api/docs', app, document_sw, {
    swaggerOptions: {
      filter: true,
    },
  });

  await app.listen(process.env.port || 3000);
}
//#####################################################################################
bootstrap();
//#####################################################################################
