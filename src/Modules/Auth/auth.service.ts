import { Injectable } from '@nestjs/common';
import { AppConfig } from '../AppConfig/app.config';

@Injectable()
export class AuthService {
  constructor(private readonly appConfig: AppConfig) {}

  public validate(apiKey: string) {
    return this.appConfig.apiKey === apiKey;
  }
}
