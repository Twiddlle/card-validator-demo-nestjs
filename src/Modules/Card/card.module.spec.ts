import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from './card.service';
import { CardModule } from './card.module';
import { CardRepository } from './Repository/card.repository';
import { CardController } from './card.controller';

describe('CardService', () => {
  let service: CardService;
  let repository: CardRepository;
  let controller: CardController;

  beforeAll(async () => {
    const app: TestingModule = await Test.createTestingModule({
      imports: [CardModule],
    }).compile();

    service = app.get(CardService);
    repository = app.get(CardRepository);
    controller = app.get(CardController);

    jest.spyOn(repository, 'loadState').mockImplementation(async () => {
      return {
        state_id: 1,
        state_description: 'Card state testing desc',
      };
    });
    jest
      .spyOn(repository, 'loadValidationData')
      .mockImplementation(async () => {
        return {
          validity_start: '2020-11-10T22:21:23.142Z',
          validity_end: '2022-11-10T22:21:23.142Z',
        };
      });
  });

  describe('service', () => {
    it('should return card info', async () => {
      const cardInfo = await service.getCardStatus('1234-5678-9101-1213');
      expect(cardInfo.state).toBe('Card state testing desc');
      expect(cardInfo.expireAt.toISOString()).toBe('2022-11-10T22:21:23.142Z');
    });
    describe('service', () => {
      it('should return card info', async () => {
        const cardInfo = await controller.getInfo('1234-5678-9101-1213');
        expect(cardInfo.state).toBe('Card state testing desc');
        expect(cardInfo.expireAt.toISOString()).toBe(
          '2022-11-10T22:21:23.142Z',
        );
      });
    });
  });
});
