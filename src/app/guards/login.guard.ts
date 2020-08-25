import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor( private usuarioService: UsuarioService ) {}

  canActivate(): boolean {

    console.log( this.usuarioService.estaAutenticado());

    if ( this.usuarioService.estaAutenticado() ) {
      console.log('Pasando por LoginGuard AUTENTICADO');
      return true;
    } else {
      console.log('Pasando por LoginGuard NO AUTENTICADO');
      Swal.fire('Autenticación', 'Tienes que estar autenticado para ver este recurso', 'info');
      return false;
    }
  }

}
