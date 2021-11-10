import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import Strategy from 'passport-headerapikey';
import { AuthService } from './auth.service';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor(private readonly authService: AuthService) {
    super({ header: 'X-Api-Key', prefix: '' }, true, (apiKey, verified) => {
      if (!authService.validate(apiKey)) {
        return verified(new UnauthorizedException(), null);
      }
      return verified(null, true);
    });
  }
}
