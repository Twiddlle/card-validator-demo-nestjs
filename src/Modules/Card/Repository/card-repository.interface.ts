import { CardStateResponse } from './Responses/card-state-response';
import { CardValidityResponse } from './Responses/card-validity-response';

export interface CardRepositoryInterface {
  loadState(cardId: string): Promise<CardStateResponse>;

  loadValidationData(cardId: string): Promise<CardValidityResponse>;
}
