import { Injectable } from '@nestjs/common';
import { AppConfig } from '../../AppConfig/app.config';
import { HttpService } from '@nestjs/axios';
import { lastValueFrom, map } from 'rxjs';
import { CardRepositoryInterface } from './card-repository.interface';
import { CardValidityResponse } from './Responses/card-validity-response';
import { CardStateResponse } from './Responses/card-state-response';

@Injectable()
export class CardRepository implements CardRepositoryInterface {
  constructor(
    private readonly appConfig: AppConfig,
    private readonly httpService: HttpService,
  ) {}

  private makeUrl(uri: string) {
    return this.appConfig.apiEndpointCards + uri;
  }

  public loadState(cardId: string): Promise<CardStateResponse> {
    return lastValueFrom(
      this.httpService
        .get(this.makeUrl(`/cards/${cardId}/state`))
        .pipe(map((res) => res.data)),
    );
  }

  public loadValidationData(cardId: string): Promise<CardValidityResponse> {
    return lastValueFrom(
      this.httpService
        .get(this.makeUrl(`/cards/${cardId}/validity`))
        .pipe(map((res) => res.data)),
    );
  }
}
