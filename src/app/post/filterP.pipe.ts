import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'postfilterP'
})


export class postfilterP implements PipeTransform {
   transform(value?: any, term?: string): any {

      term = term ? term.toLocaleLowerCase() : '';
      return term && value ?
        value.filter(product =>
           (product.author.toLocaleLowerCase().indexOf(term) !== -1) ||
           (product.title.toLocaleLowerCase().indexOf(term) !== -1) 
        ) :
        value;
   }
}
