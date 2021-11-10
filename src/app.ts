import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { DocumentBuilder, OpenAPIObject, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './Modules/_App/app.module';
import { AppConfig } from './Modules/AppConfig/app.config';
import helmet from 'helmet';
import {
  ReferenceObject,
  SecuritySchemeObject,
} from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

async function createApp() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
  );

  const appConfig = app.get(AppConfig);

  app.setGlobalPrefix(appConfig.appVersion);
  app.use(helmet());

  await buildApiDocs(app, appConfig);
  return app;
}

export async function buildApiDocs(
  app: NestExpressApplication,
  appConfig: AppConfig,
) {
  const options = new DocumentBuilder()
    .addApiKey({
      type: 'apiKey',
    })
    .setTitle('Card validator demo')
    .setDescription('Card validator demo open api docs')
    .setVersion(appConfig.appVersion)
    .build();

  const document = SwaggerModule.createDocument(app, options) as
    | OpenAPIObject
    | any;

  const securitySchemes: Record<
    string,
    SecuritySchemeObject | ReferenceObject
  > = {
    apiKey: {
      type: 'apiKey',
      in: 'header',
      name: 'x-api-key',
    },
  };
  if (document.components) {
    document.components.securitySchemes = securitySchemes as any;
  }
  document.securityDefinitions = securitySchemes as any;

  SwaggerModule.setup('explorer', app, document);
}

async function bootstrap() {
  const app = await createApp();
  await app.listen(app.get(AppConfig).appPort);
  return app;
}

export { bootstrap, createApp };
