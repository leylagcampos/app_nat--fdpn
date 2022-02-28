import { Component, Input, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-seleccionar-clientes',
  templateUrl: './seleccionar-clientes.component.html',
  styleUrls: ['./seleccionar-clientes.component.scss']
})
export class SeleccionarClientesComponent implements OnInit {
  clientes: Cliente[] = new Array<Cliente>()
  @Input('client') client:String | undefined;

  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.db.collection<any>('clientes').get().subscribe((res) => {
      this.clientes.length = 0;
      res.docs.forEach((item) => {
        let cliente: Cliente = item.data();
        cliente.id = item.id;
        cliente.ref = item.ref;
        cliente.visible = false;
        this.clientes.push(cliente);
      })
    })
  }

  buscarcliente(datoingresado: string){
    this.clientes.forEach((cliente)=>{
      if(cliente.nombre.toLowerCase().includes(datoingresado.toLowerCase()) || cliente.apellido.toLowerCase().includes(datoingresado.toLowerCase())){
        cliente.visible=true;
      }
      else{
        cliente.visible=false;
      }
    })
  }

  seleccionarcliente(cliente: Cliente){
    this.client= cliente.nombre +" "+ cliente.apellido;
    this.clientes.forEach((cliente)=>{
      cliente.visible=false;
    })
  }
  
  limpiarseleccion(){
    this.client=undefined;
  }

}
