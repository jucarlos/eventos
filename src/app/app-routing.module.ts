import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EventosComponent } from './components/eventos/eventos.component';
import { EventoComponent } from './components/eventos/evento.component';


const routes: Routes = [
  { path: 'eventos', component: EventosComponent },
  { path: 'evento/:id', component: EventoComponent },
  { path: '**', pathMatch: 'full',  redirectTo: 'eventos'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
