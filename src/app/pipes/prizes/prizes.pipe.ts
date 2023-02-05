import { Pipe, PipeTransform } from '@angular/core';
import { IPrize } from 'src/app/interfaces/prize.interface';

@Pipe({
  name: 'prizes'
})
export class PrizesPipe implements PipeTransform {

  transform(value: IPrize[]) {
    return value.map(x => {
      return `${x.quantity} - ${x.name_english} `
    });
  }

}
