import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string ): Promise<any> {

    return new Promise( (resolve, reject ) => {

      let formData = new FormData();
      let xhr = new XMLHttpRequest();

      formData.append( 'imagen', archivo, archivo.name );

      xhr.onreadystatechange = function() {

        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {
            resolve( JSON.parse( xhr.response ) );
          } else {
            reject( xhr.response );
          }

        }
      };

      let url = URL_SERVICIOS + '/upload/' + tipo + '/' + id;

      console.log( url );

      xhr.open('PUT', url, true );
      // xhr.setRequestHeader('token', this.usuarioService.token );
      xhr.send( formData );

    });



}
}

