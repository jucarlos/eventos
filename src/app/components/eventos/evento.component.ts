import { Component, OnInit } from '@angular/core';
import { Evento } from '../../models/evento';
import { EventoService } from '../../services/evento.service';

import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';
import { Asistente } from '../../models/asistente';
import { InscripcionService } from '../../services/inscripcion.service';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html'
})
export class EventoComponent implements OnInit {

  evento: Evento = new Evento('', '');
  titulo = 'Nuevo evento';
  tituloBoton = 'Guardar';
  cuadroParticipantesEventos = false;

  participantesEventos: Asistente[] = [];

  cargando = false;
  cargandoParticipantes = true;

  idEvento = '';

  constructor(private eventoService: EventoService,
              private router: Router,
              private inscripcionService: InscripcionService,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarEvento();
  }


  guardarEvento(): void {
    this.cargando = true;
    this.eventoService.guardarEvento( this.evento )
    .subscribe( resp => {
      if ( resp.ok ) {
        Swal.fire('Guardado', `${resp.evento.nombre}, ha sido guardado correctamente`, 'success');
        this.cargando = false;
        this.router.navigate(['/eventos']);
       }
    });
  }


  cargarEvento(): void {

    this.activatedRoute.params.subscribe( (params: any) => {
      const id =  params['id'];
      this.idEvento = id;

      if ( id !== 'nuevo') {
          this.titulo = 'Actualizar Evento';
          this.tituloBoton = 'Actualizar';
          this.cuadroParticipantesEventos = true;
          this.eventoService.getEvento( id )
          .subscribe( (resp: Evento) => {
           this.evento = resp;
           this.cargarParticipantes();
          });
        }
    });
  }


  cargarParticipantes(): void {

    this.cargandoParticipantes = true;
    this.inscripcionService.getParticipantesEvento( this.evento._id )
    .subscribe ( resp => {
      this.participantesEventos = resp.asistentes;
      this.cargandoParticipantes = false;
    }, error => {
      Swal.fire('Error', 'Error en la carga de participantes', 'error');
      this.cargandoParticipantes = false;
      this.router.navigate(['/eventos']);
    });


  }

  eliminaAsistente( asistente: Asistente ): void {

    Swal.fire({
      title: 'Estás seguro',
      text: `Vas a borrar a ${asistente.nombre} de ${this.evento.nombre}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo'
    }).then((result) => {
      if (result.value) {
        this.inscripcionService.borrarAsistente(asistente._id)
        .subscribe( (resp: any) => {
            if ( resp.ok ) {
              Swal.fire(
                'Borrado!',
                `${asistente.nombre}, ha sido borrado`,
                'success'
              );
              this.cargarParticipantes();
            } else {
              Swal.fire(
                'Error!',
                `Error al borrar a ${asistente.nombre}`,
                'error'
              );
            }
        });
      }
    });

  }


}

