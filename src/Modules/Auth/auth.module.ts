import { Module } from '@nestjs/common';
import { AppConfigModule } from '../AppConfig/app-config.module';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { ApiKeyStrategy } from './api-key.strategy';

@Module({
  imports: [AppConfigModule, PassportModule],
  providers: [AuthService, ApiKeyStrategy],
  exports: [AuthService, ApiKeyStrategy],
})
export class AuthModule {}
