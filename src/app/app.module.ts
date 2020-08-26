import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';4
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FootComponent } from './shared/foot/foot.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { EventoComponent } from './components/eventos/evento.component';
import { ModalComponent } from './shared/modal/modal.component';
import { InscripcionComponent } from './components/inscripcion/inscripcion.component';
import { BusquedaComponent } from './components/busqueda/busqueda.component';
import { ImagenPipe } from './pipes/imagen.pipe';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FootComponent,
    EventosComponent,
    EventoComponent,
    ModalComponent,
    InscripcionComponent,
    BusquedaComponent,
    ImagenPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
