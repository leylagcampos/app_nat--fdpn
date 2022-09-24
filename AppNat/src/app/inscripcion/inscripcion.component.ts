import { Component, OnInit } from '@angular/core';
import { AngularFirestore,DocumentReference } from '@angular/fire/compat/firestore';
import { Cliente } from '../models/cliente';
import { Inscripcion } from '../models/inscripcion';
import { Precio } from '../models/precio';

@Component({
  selector: 'app-inscripcion',
  templateUrl: './inscripcion.component.html',
  styleUrls: ['./inscripcion.component.scss']
})
export class InscripcionComponent implements OnInit {
  inscripcion: Inscripcion = new Inscripcion();
  clienteseleccionado: Cliente = new Cliente();
  precios:Precio[]=new Array<Precio>();

  constructor( private db: AngularFirestore) { }

  ngOnInit() {
    this.db.collection('precios').get().subscribe((res)=>{
      res.docs.forEach((item)=>{
        let precio=item.data() as Precio;
        precio.id=item.id;
        precio.ref=item.ref as DocumentReference;
        this.precios.push(precio)
      })
    })
  }

  asignarcliente(cliente: Cliente) {
    this.inscripcion.cliente = cliente.ref;
    this.clienteseleccionado = cliente;
  }
  cancelarseleccion() {
    this.clienteseleccionado = new Cliente();
    this.inscripcion.cliente = undefined;
  }

  guardar(){
    console.log(this.inscripcion);
  }
}
