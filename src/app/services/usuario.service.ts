import { Injectable, EventEmitter } from '@angular/core';
import { Usuario } from '../models/usuario';
import { URL_SERVICIOS } from '../../environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { catchError, map } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { ModalService } from './modal.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {


  // Estas propiedades, para luego saber si está logueado.
  usuario: Usuario = new Usuario('', '', '');
  token = '';

  httpHeaders = new HttpHeaders(
    {'Content-Type': 'application/json'}
  );

  constructor( private http: HttpClient, private modalService: ModalService) {
    this.cargarStorage();
    if ( this.estaAutenticado()) {
      console.log('SI', this.usuario.nombre);
    } else {
      this.usuario = new Usuario('', '', '');
      // console.log('NO');
    }

  }


  logout(): void {
    this.borrarStorage();
    this.modalService.notificarUsuarioLogeado.emit('');
  }


  obtenerDatosToken(): any {

    if (this.token.length > 5) {
       return JSON.parse(atob(this.token.split('.')[1]));
    }
    return null;
  }


  estaAutenticado(): boolean {

    const payload: any = this.obtenerDatosToken();

    if ( payload != null && payload.usuario.nombre.length > 3 && payload.usuario.nombre === this.usuario.nombre ) {

      if ( this.isTokenExpirado( payload.exp )) {
        return false;
      }

      return true;

    } else {
      return false;
    }
  }

  isTokenExpirado(exp: number ): boolean {

    const now = new Date().getTime() / 1000;

    // console.log( 'Fecha actual: ', new Date(now * 1000));
    // console.log ( exp);
    // console.log( 'Fecha caduda: ', new Date(exp * 1000));

    if (exp < now) {
      return true;
    }
    return false;

  }


  borrarStorageEmail(): void {
    localStorage.removeItem('email');
  }

  cargarStorage(): void {
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  guardarStorageEmail( email: string ): void {
    localStorage.setItem('email', email );
  }

  guardarStorage( nombre: string, token: string , usuario: Usuario): void {
    localStorage.setItem('nombre', nombre);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify( usuario ));
    this.usuario = usuario;
    this.token = token;
  }

  borrarStorage(): void {
    localStorage.removeItem('nombre');
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.usuario = new Usuario('', '', '');
    this.token = '';
    this.borrarStorageEmail();
  }

  login( usuario: Usuario, recuerdame: boolean  ): Observable<any> {

    const url = URL_SERVICIOS + '/login';

    return this.http.post( url, usuario, { headers: this.httpHeaders })
    .pipe(
      map( (data: any) => {
        this.guardarStorage(
          data.usuario.nombre,
          data.token,
          data.usuario );

        if ( recuerdame ) {
           this.guardarStorageEmail( data.usuario.email );
        } else  {
          this.borrarStorageEmail();
        }

        this.modalService.notificarUsuarioLogeado.emit('acceso');


        return data;
      }),
      catchError ( err => {
        return throwError(err);
      })
    );

  }

  crearUsuario( usuario: Usuario): Observable<any> {


    const url = URL_SERVICIOS + '/usuarios';

    return this.http.post(url, usuario, { headers: this.httpHeaders} )
    .pipe(
      map ( (resp: any) => {
        // console.log( 'Respuesta: ', resp);
        Swal.fire ('Usuario Creado', usuario.email, 'success');
        return resp.usuario;
      }),
      catchError ( (err ) => {
       // console.log('Error, ', err.error.error.message);
        Swal.fire('Error', err.error.error.message, 'info');
        return throwError( err );
      })
    ) ;

  }

}
