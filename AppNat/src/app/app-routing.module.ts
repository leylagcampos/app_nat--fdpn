import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarClientesComponent } from './agregar-clientes/agregar-clientes.component';
import { VerClientesComponent } from './ver-clientes/ver-clientes.component';

const routes: Routes = [
  {
    path:'ver-clientes', component:VerClientesComponent
    
  },
  {
    path:'agregar-clientes', component:AgregarClientesComponent

  },
  {
    path:'agregar-clientes/:clienteID', component:AgregarClientesComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
