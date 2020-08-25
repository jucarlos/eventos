import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Asistente } from '../models/asistente';
import { URL_SERVICIOS } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InscripcionService {

  constructor(private http: HttpClient) { }

  inscribirAsistente(asistente: Asistente): Observable<any> {

    const URL = URL_SERVICIOS + '/asistentes';

    return this.http.post<Observable<any>>(URL, asistente);

  }


  getParticipantesEvento( idEvento: string ): Observable<any> {
    const URL = URL_SERVICIOS + '/asistentes/evento/' + idEvento;
    return this.http.get<Observable<any>>(URL);
  }

  borrarAsistente( idAsistente: string): Observable<any> {

    const URL = URL_SERVICIOS + '/asistentes/' + idAsistente;
    return this.http.delete<Observable<any>>(URL);

  }

  buscarInscripciones( telefono: string ): Observable<any> {
    const URL = URL_SERVICIOS + '/asistentes/telefono/' + telefono;
    return this.http.get<Observable<any>>(URL);
  }

}
