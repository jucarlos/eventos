import { Component, OnInit } from '@angular/core';
import { Evento } from '../../models/evento';
import { EventoService } from '../../services/evento.service';

import Swal from 'sweetalert2';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html'
})
export class EventoComponent implements OnInit {

  evento: Evento = new Evento('', '');
  titulo = 'Nuevo evento';
  tituloBoton = 'Guardar';

  participantesEventos = false;

  idEvento = '';

  constructor(private eventoService: EventoService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarEvento();
  }


  guardarEvento(): void {
    this.eventoService.guardarEvento( this.evento )
    .subscribe( resp => {
      if ( resp.ok ) {
        Swal.fire('Guardado', `${resp.evento.nombre}, ha sido guardado correctamente`, 'success');
        this.router.navigate(['/eventos']);
       }
    });
  }


  cargarEvento(): void {

    this.activatedRoute.params.subscribe( (params: any) => {
      const id =  params['id'];
      this.idEvento = id;

      if ( id !== 'nuevo') {
          this.tituloBoton = 'Actualizar';
          this.participantesEventos = true;
          this.eventoService.getEvento( id )
          .subscribe( (resp: Evento) => {
           this.evento = resp;
          });
        }
    });
  }

}
