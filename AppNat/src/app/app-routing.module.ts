import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgregarClientesComponent } from './agregar-clientes/agregar-clientes.component';
import { ListarClientesComponent } from './listar-clientes/listar-clientes.component';
import { PreciosComponent } from './precios/precios.component';

const routes: Routes = [
  {
    path:'listar-clientes', component:ListarClientesComponent
    
  },
  {
    path:'agregar-clientes', component:AgregarClientesComponent

  },
  {
    path:'agregar-clientes/:clienteID', component:AgregarClientesComponent

  },
  {
    path:'precios', component:PreciosComponent

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
