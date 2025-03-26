import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import * as morgan from 'morgan';

async function bootstrap() {
  const port = process.env.PORT || 3001;
  const app = await NestFactory.create(AppModule);

  // Lista de dominios permitidos
  const allowedOrigins = [`http://localhost:${port}`, 'http://localhost:3000'];

  // Configuración de CORS
  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  // Prefijo global para todas las rutas
  app.setGlobalPrefix('api/v1');

  // Validaciones globales
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Pruebas')
    .setDescription('Documentación de la API para el backend de prueba.')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer(`http://localhost:${port}`, 'Servidor Local') // Servidor local
    .addServer('https://api.backend_pruebas.com', 'Servidor de Producción') // Servidor Producción
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'Documentación API - Backend de Pruebas',
  });

  // Logger con Morgan
  app.use(morgan('dev'));

  await app.listen(port);
  console.info(`🚀 Server running on http://localhost:${port}`);
}
bootstrap();
