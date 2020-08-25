import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styles: [
  ]
})
export class ModalComponent implements OnInit {

  recuerdame = false;

  usuario = new Usuario('', '', '');

  constructor(private modalService: ModalService,
              private usuarioService: UsuarioService) {
                console.log('Entramos por constructor');
               }

  ngOnInit(): void {

    console.log('Entramos por init');
    this.usuario.email = localStorage.getItem('email')  || '';
    if ( this.usuario.email.length > 1 ) {
      this.recuerdame = true;
    }
  }

  entrar(): void {

    console.log('Entramos entrar');

    this.usuarioService.login( this.usuario, this.recuerdame)
    .pipe(
      catchError( err  => {
        Swal.fire('Autenticación', err.error.err.message, 'info');
        // console.log( err.error.err.message );
        return throwError ( err );
      })
    )
    .subscribe( (resp: any) => {
      this.modalService._notificarUsuarioLogeado.emit(resp.usuario.nombre);
    });

    this.cerrarModal();

  }

  cerrarModal(): void {
    this.modalService.cerrarModal();
  }


}
