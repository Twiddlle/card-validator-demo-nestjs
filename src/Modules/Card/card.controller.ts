import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { CardIdValidationPipe } from './Pipes/card-id-validation-pipe';
import { CardService } from './card.service';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { CardInfoDto } from './Dto/card-info.dto';
import { AuthGuard } from '../Auth/auth-guard';

@Controller('/cards')
@ApiTags('Cards')
@ApiSecurity('apiKey')
@UseGuards(AuthGuard)
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Get('/info/:cardId')
  @ApiOkResponse({ type: CardInfoDto })
  @ApiOperation({
    operationId: 'getCardInfo',
    description: 'Return information about card',
  })
  @ApiParam({
    name: 'cardId',
    description: 'Card id',
    example: '1234-5489-7896-4587',
  })
  public getInfo(@Param('cardId', new CardIdValidationPipe()) cardId: string) {
    return this.cardService.getCardStatus(cardId);
  }
}
