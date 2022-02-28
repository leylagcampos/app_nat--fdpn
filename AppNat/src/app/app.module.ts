import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from '@angular/fire/compat';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EncabezadoComponent } from './encabezado/encabezado.component';
import { MenuComponent } from './menu/menu.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AgregarClientesComponent } from './agregar-clientes/agregar-clientes.component';
import { MensajesService } from './services/mensajes.service';
import { PreciosComponent } from './precios/precios.component';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { InscripcionComponent } from './inscripcion/inscripcion.component';
import { HorariosComponent } from './horarios/horarios.component';
import { SeleccionarClientesComponent } from './seleccionar-clientes/seleccionar-clientes.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    EncabezadoComponent,
    MenuComponent,
    AgregarClientesComponent,
    PreciosComponent,
    ListarClientesComponent,
    InscripcionComponent,
    HorariosComponent,
    SeleccionarClientesComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [AngularFireAuth,AngularFirestore,MensajesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
