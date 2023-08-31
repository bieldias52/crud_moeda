import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncarNome'
})
export class TruncarNomePipe implements PipeTransform {
  transform(nome?: string): string {
    if (nome) {
      if (nome.length > 20) {
        const nomeTruncado = nome.slice(0, 16) + '...';
        return nomeTruncado;
      } else {
        return nome;
      }
    } else {
      return '';
    }
  }
}