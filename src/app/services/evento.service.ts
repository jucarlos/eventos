import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Evento } from '../models/evento';

@Injectable({
  providedIn: 'root'
})
export class EventoService {

  constructor(
    private http: HttpClient
  ) { }

  getEventos(): Observable<Evento[]> {

    const URL = URL_SERVICIOS + '/eventos';
    return this.http.get(URL).pipe(
      map( (resp: any) => {
        return resp.eventos;
      })
    );
  }

  guardarEvento( evento: Evento ): Observable<any> {

    const URL = URL_SERVICIOS + '/eventos';
    return this.http.post<Observable<any>>(URL, evento);

  }

  getEvento( id: string ): Observable<any> {
    const URL = URL_SERVICIOS + '/eventos/' + id ;
    return this.http.get(URL).pipe(
      map( (resp: any) => {
        return resp.evento;
      })
    );

  }

}
