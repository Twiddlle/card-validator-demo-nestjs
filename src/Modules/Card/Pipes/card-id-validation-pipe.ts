import { BadRequestException, PipeTransform } from '@nestjs/common';

export class CardIdValidationPipe implements PipeTransform {
  transform(value: string) {
    value = value.replace(/[^0-9]/g, '');
    if (!value.match(/^\d{16}$/)) {
      throw new BadRequestException('Not valid card id');
    }
    return value;
  }
}
