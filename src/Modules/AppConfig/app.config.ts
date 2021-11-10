import { Injectable } from '@nestjs/common';

@Injectable()
export class AppConfig {
  public appPort = Number(process.env.APP_PORT) || 3000;
  public appVersion = process.env.APP_VERSION || 'v1';
  public apiEndpointCards = process.env.API_ENDPOINT_CARDS;
  public apiKey = process.env.APP_API_KEY;
}
