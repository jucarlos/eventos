import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';
import { ModalService } from '../../services/modal.service';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html'
})
export class EventosComponent implements OnInit {

  eventos: Evento[] = [];
  cargando = true;

  constructor(
    public modalService: ModalService,
    public usuarioService: UsuarioService,
    private eventosService: EventoService,
    private router: Router
  ) {
    this.cargarEventos();
  }

  ngOnInit(): void {
  }

  incribir(idEvento: string ): void {
    console.log('Navega');
    this.router.navigate(['/inscripcion', idEvento]);
  }

  cargarEventos(): void {
    this.cargando = true;
    this.eventosService.getEventos()
    .subscribe( eventos =>  {
        this.eventos = eventos;
        this.cargando = false;
    });

  }

  abrirModal(): void {
    this.modalService.abrirModal();
  }

  salir(): void {
    this.usuarioService.logout();
    this.router.navigate(['/home']);
  }

  borrarEvento( evento: Evento): void {

    Swal.fire({
      title: 'Estás seguro',
      text: `Vas a borrar a ${evento.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo'
    }).then((result) => {
      if (result.value) {
        this.eventosService.borrarEvento(evento._id)
        .subscribe( (resp: any) => {
            if ( resp.ok ) {
              Swal.fire(
                'Borrado!',
                `${evento.nombre}, ha sido borrado`,
                'success'
              );
              this.cargarEventos();
            } else {
              Swal.fire(
                'Error!',
                `Error al borrar a ${evento.nombre}`,
                'error'
              );
            }
        });
      }
    });



  }


}
