import { Component, OnInit } from '@angular/core';
import { EventoService } from 'src/app/services/evento.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Evento } from '../../models/evento';

import Swal from 'sweetalert2';
import { Asistente } from '../../models/asistente';
import { InscripcionService } from '../../services/inscripcion.service';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styles: [
  ]
})
export class InscripcionComponent implements OnInit {

  evento: Evento = new Evento('', '');
  asistente: Asistente = new Asistente('', '');

  cargando = false;

  constructor(private eventoService: EventoService,
              private inscripcionService: InscripcionService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.cargarEvento();
  }

  cargarEvento(): void {

    this.activatedRoute.params.subscribe( (params: any) => {
      const id =  params['id'];
      this.eventoService.getEvento( id )
        .subscribe( (resp: Evento) => {
          this.evento = resp;
        }, ( err ) => {
          Swal.fire('Error', `Se ha producido un error al hacer la subscripción`, 'error');
          this.router.navigate(['/eventos']);
        });

    });
  }

  guardarInscripcion(): void {

    const lon = this.asistente.telefono.toString();

    if ( lon.length !== 9 ) {
        Swal.fire('Teléfono', 'El número de teléfono tiene que tener 9 dígitos', 'info');
        return;
    }

    this.asistente.evento = this.evento._id;

    this.cargando = true;
    this.inscripcionService.inscribirAsistente( this.asistente )
      .subscribe ( resp => {
        this.cargando = false;
        Swal.fire('Guardado', `${this.asistente.nombre}, ha sido inscrito correctamente a ${this.evento.nombre} y con el número ${resp.asistente.numero}`, 'success');
        this.router.navigate(['/eventos']);
      }, ( error ) => {
        this.cargando = false;
        Swal.fire('Error', `${error.error.mensaje}`, 'error');
        this.router.navigate(['/eventos']);
      });

  }



}
