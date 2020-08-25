import { Component, OnInit } from '@angular/core';

import Swal from 'sweetalert2';
import { InscripcionService } from '../../services/inscripcion.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent implements OnInit {

  constructor(
    private router: Router,
    private inscripcionService: InscripcionService) { }

  telefono = '';
  cargando = false;

  cuadroInscripciones = false;
  inscripciones = [];

  ngOnInit(): void {
  }

  buscarInscripciones(): void {

    this.cuadroInscripciones = true;
    this.cargando = true;

    console.log('Bucando');

    const lon = this.telefono.toString();

    if ( lon.length !== 9 ) {
        Swal.fire('Teléfono', 'El número de teléfono tiene que tener 9 dígitos', 'info');
        return;
    }

    this.inscripcionService.buscarInscripciones(lon)
    .subscribe( (resp: any) => {
      this.inscripciones = resp.asistentes;
      console.log( '888888', this.inscripciones);
      this.cargando = false;
    }, ( err ) => {
      this.cargando = false;
      Swal.fire('Error', 'Se ha producido un error al recuperar las inscripciones', 'info');
      this.router.navigate(['/eventos']);
    });

  }

}
