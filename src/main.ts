import { NestFactory } from '@nestjs/core'

import { ValidationPipe } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { AppModule } from './app.module'
import { BusinessExceptionFilter } from './core/exception/business.exception.filter'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // Config service
  const configService = app.get(ConfigService)

  // Swagger document
  const config = new DocumentBuilder()
    .setTitle('NestJS Sample APIs')
    .setDescription('NestJS Sample APIs')
    .setVersion('1.0')
    .addTag('index')
    .addTag('auth')
    .addTag('master')
    .addTag('owner')
    .addTag('user')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('docs', app, document)

  // Global filter
  app.useGlobalFilters(new BusinessExceptionFilter())

  // Global pipes
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      validateCustomDecorators: true
    })
  )

  // CORS
  const options = {
    origin: '*',
    methods: ['OPTIONS', 'GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    allowedHeaders: [
      'content-type',
      'authorization',
      'sso-api-key',
      'sso-artifact-id',
      'sso-artifact-key',
      'sso-client-id',
      'sso-client-secret',
      'sso-cid',
      'sso-roles',
      'timezone',
      'lang',
      'uuid'
    ],
    exposedHeaders: ['authorization', 'code'],
    optionsSuccessStatus: 200
  }
  app.enableCors(options)

  // Start listing
  await app.listen(+configService.get('SERVER_PORT'))
}

bootstrap()
