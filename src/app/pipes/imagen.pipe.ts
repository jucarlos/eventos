import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVICIOS } from '../../environments/environment';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuario'): any {

    let url = URL_SERVICIOS + '/imagen';

    if ( !img ) {
      // devuelvel la imagen por defecto
      return url + '/usuarios/xxx';
    }

    // si viene https es que es una imagen de google
    if ( img.indexOf ('https') >= 0 ){
      return img;
    }

    switch (tipo) {
      case 'clientes':
        url = img;
        break;
      case 'usuario':
          url = img;
          break;
     case 'colegios':
          url = img;
          break;
      case 'profesores':
          url = img;
          break;
      case 'eventos':
          url = img;
          break;
      default:
          url += '/usuarios/xxx';
          break;
    }

    return url;

  }


}
