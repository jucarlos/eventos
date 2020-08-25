import { Component, OnInit } from '@angular/core';
import { EventoService } from '../../services/evento.service';
import { Evento } from '../../models/evento';
import { ModalService } from '../../services/modal.service';
import { UsuarioService } from '../../services/usuario.service';
import { Router } from '@angular/router';

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


}
