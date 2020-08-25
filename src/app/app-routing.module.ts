import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventosComponent } from './components/eventos/eventos.component';
import { EventoComponent } from './components/eventos/evento.component';
import { LoginGuard } from './guards/login.guard';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';


const routes: Routes = [
  { path: 'eventos', component: EventosComponent  },
  { path: 'evento/:id', component: EventoComponent, canActivate: [ LoginGuard ] },
  { path: 'inscripcion/:id', component: InscripcionComponent },
  { path: 'busqueda', component: BusquedaComponent },
  { path: '**', pathMatch: 'full',  redirectTo: 'eventos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
