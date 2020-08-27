import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Evento } from '../models/evento';
import { SubirArchivoService } from './subir-archivo.service';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(
    private http: HttpClient,
    private subirArchivoService: SubirArchivoService
  ) { }

  getEventos(): Observable<Evento[]> {

    const URL = URL_SERVICIOS + '/eventos/conasistentes';
    return this.http.get(URL).pipe(
      map( (resp: any) => {
        return resp.eventos;
      })
    );
  }

  guardarEvento( evento: Evento ): Observable<any> {

    console.log( evento);

    if ( evento._id ) {
      const URL = URL_SERVICIOS + '/eventos/' + evento._id;
      return this.http.put<Observable<any>>(URL, evento );

    } else {
      const URL = URL_SERVICIOS + '/eventos';
      return this.http.post<Observable<any>>(URL, evento);
    }

  }

  getEvento( id: string ): Observable<any> {
    const URL = URL_SERVICIOS + '/eventos/' + id ;
    return this.http.get(URL).pipe(
      map( (resp: any) => {
        return resp.evento;
      })
    );

  }

  borrarEvento( id: string): Observable<any> {
    const URL = URL_SERVICIOS + '/eventos/' + id;
    return this.http.delete<Observable<any>>(URL);
  }

  cambiarImagen( archivo: File, id: string ): any {

    return this.subirArchivoService.subirArchivo( archivo , 'eventos', id );
  }


}
