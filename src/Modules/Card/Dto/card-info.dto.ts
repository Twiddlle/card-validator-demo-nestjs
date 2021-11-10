import { ApiModelProperty } from '@nestjs/swagger/dist/decorators/api-model-property.decorator';
import { Transform } from 'class-transformer';
import moment from 'moment';

export class CardInfoDto {
  @ApiModelProperty({
    type: String,
    description: 'Expiration date of the card',
  })
  @Transform(
    (params) => {
      return moment(params.value).format('D.M.YYYY');
    },
    { toPlainOnly: true },
  )
  public expireAt: Date;

  @ApiModelProperty({ description: 'State of the card as a text' })
  public state: string;
}
