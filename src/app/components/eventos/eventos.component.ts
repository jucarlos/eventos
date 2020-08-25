import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';

@Component({
  selector: 'app-eventos',
  templateUrl: './eventos.component.html'
})
export class EventosComponent implements OnInit {

  eventos: Evento[] = [];

  constructor(
    private eventosService: EventoService
  ) { 
    this.cargarEventos();
  }

  ngOnInit(): void {
  }

  cargarEventos(): void {
    this.eventosService.getEventos()
    .subscribe( eventos =>   this.eventos = eventos );

  }


}
