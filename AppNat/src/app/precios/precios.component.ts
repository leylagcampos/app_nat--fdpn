import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Precio } from '../models/precio';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-precios',
  templateUrl: './precios.component.html',
  styleUrls: ['./precios.component.scss']
})
export class PreciosComponent implements OnInit {
  formPrecio: FormGroup = new FormGroup({});
  precios: Precio[] = new Array<Precio>();
  esEditable: boolean = false;
  id: string | undefined;

  constructor(private fb: FormBuilder, private db: AngularFirestore, private mensajes: MensajesService) { }

  ngOnInit() {
    this.formPrecio = this.fb.group({
      nombreplan: ['', Validators.required],
      precio: ['', Validators.required],
      cntclases: ['', Validators.required],
      dias: ['', Validators.required]
    })

    this.listarprecios()
  }

  listarprecios() {
    this.db.collection<Precio>('precios').get().subscribe((res) => {
      this.precios.length = 0
      res.docs.forEach((dato) => {
        let precio: any = dato.data() as Precio;
        precio.id = dato.id;
        precio.ref = dato.ref;
        this.precios.push(precio);
      });
    })
  }
  agregarprecio() {
    this.db.collection<Precio>('precios').add(this.formPrecio.value).then(() => {
      this.mensajes.msjExito('Agregado con éxito', 'El precio ha sido agregado correctamente')
      this.formPrecio.reset()
      this.listarprecios()
    }).catch(() => {
      this.mensajes.msjError('Error !', 'El precio no se pudo agregar')
    }
    )
  }

  mostrarprecio(precio: Precio) {
    this.esEditable = true;
    this.formPrecio.setValue({
      nombreplan: precio.nombreplan,
      precio: precio.precio,
      dias: precio.dias,
      cntclases: precio.cntclases
    })
    this.id = precio.id;
  }
  editarprecio() {
    this.db.doc('precios/' + this.id).update(this.formPrecio.value).then(() => {
      this.mensajes.msjExito('Editado!', 'Precio editado correctamente')
      this.formPrecio.reset()
      this.esEditable = false
      this.listarprecios()
    }).catch(() => {
      this.mensajes.msjError('Error!', "No se pudo editar el precio")
    })

  }
  eliminarprecio(precio:Precio) {
    this.db.doc('precios/' + precio.id).delete().then(() => {
      this.mensajes.msjExito('Eliminado!', 'Precio eliminado con éxito')
      this.listarprecios()
    }).catch(() => {
      this.mensajes.msjError('Error','Hubo un error y no se pudo eliminar el precio')
    })
  }
}
