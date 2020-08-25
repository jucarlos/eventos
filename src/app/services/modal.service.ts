import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalService {


  // tslint:disable-next-line: variable-name
  _notificarUsuarioLogeado = new EventEmitter<any>();


  modal = false;


  constructor() { }

  get notificarUsuarioLogeado(): EventEmitter<any> {
    return this._notificarUsuarioLogeado;
  }


  abrirModal(): void {
    this.modal = true;
  }

  cerrarModal(): void {
    this.modal = false;
  }
}
