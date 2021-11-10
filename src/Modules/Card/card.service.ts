import { Injectable } from '@nestjs/common';
import { CardRepository } from './Repository/card.repository';
import { CardInfoDto } from './Dto/card-info.dto';
import { CardStateResponse } from './Repository/Responses/card-state-response';
import { CardValidityResponse } from './Repository/Responses/card-validity-response';

@Injectable()
export class CardService {
  constructor(private readonly cardRepository: CardRepository) {}

  public async getCardStatus(cardId: string) {
    const cardInfoDto = new CardInfoDto();

    const loadingInfoPromises: [
      Promise<CardStateResponse>,
      Promise<CardValidityResponse>,
    ] = [
      this.cardRepository.loadState(cardId),
      this.cardRepository.loadValidationData(cardId),
    ];

    const loadedCardData = await Promise.all(loadingInfoPromises);
    cardInfoDto.state = loadedCardData[0].state_description;
    cardInfoDto.expireAt = new Date(loadedCardData[1]?.validity_end);
    return cardInfoDto;
  }
}
