import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CardService } from './card.service';
import { CardRepository } from './Repository/card.repository';
import { AppConfigModule } from '../AppConfig/app-config.module';
import { CardController } from './card.controller';

@Module({
  imports: [HttpModule, AppConfigModule],
  providers: [CardService, CardRepository],
  exports: [CardService, CardRepository],
  controllers: [CardController],
})
export class CardModule {}
