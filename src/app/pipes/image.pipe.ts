import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {

  transform( img: string, tipo: string = 'usuario'): any {
    
    let url = URL_SERVICIOS + '/img';

    if (!img) {
      return url + '/usuarios/xxx';
    }
    
    // es una img de google, retorno el mismo url sin ninguna transformacion
    if (img.indexOf('https') >= 0) {
      return img;
    }

    switch ( tipo ) {
      case 'usuario':
        url += '/usuarios/' + img;
        break;
      case 'medico':
        url += '/medicos/' + img;
        break;
      case 'hospital':
        url += '/hospitales/' + img;
        break;
    
      default:
        console.log('tipo de imagen inexistente');
        url += '/usuarios/xxx';
        break;
    }
    return url;
  }

}
