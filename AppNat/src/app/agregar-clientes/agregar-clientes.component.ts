import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MensajesService } from '../services/mensajes.service';

@Component({
  selector: 'app-agregar-clientes',
  templateUrl: './agregar-clientes.component.html',
  styleUrls: ['./agregar-clientes.component.scss']
})
export class AgregarClientesComponent implements OnInit {

  porcentajeSubida: number = 0;
  urlimg: string = '';
  id: string = '';
  esEditable: boolean = false;
  formularioCliente: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
    private storage: AngularFireStorage,
    private db: AngularFirestore,
    private activeRoute: ActivatedRoute,
    private mensaje:MensajesService
  ) {

  }

  ngOnInit() {

    this.formularioCliente = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])],
      dni: [''],
      cel: [''],
      imgurl: ['', Validators.required],
    })

    this.id = this.activeRoute.snapshot.params['clienteID'];
    if (this.id != undefined) {
      this.esEditable = true;
      this.db.doc<any>('clientes/' + this.id).valueChanges().subscribe((cliente) => {

        this.formularioCliente.setValue({
          nombre: cliente.nombre,
          apellido: cliente.apellido,
          email: cliente.email,
          cel: cliente.cel,
          dni: cliente.dni,
          imgurl: ''
        })
        this.urlimg = cliente.imgurl

      });
    }
  }

  editar() {
    this.formularioCliente.value.imgurl = this.urlimg;
    this.db.doc('clientes/' + this.id).update(this.formularioCliente.value).then((res) => {
      this.mensaje.msjExito('Editado','Se editó el cliente correctamente')
    }).catch(() => {
      this.mensaje.msjError('Error!','Hubo un problema para actualizar el cliente.Revise si todo esta correcto')
    })
  }

  agregar() {
    this.formularioCliente.value.imgurl = this.urlimg;
    console.log(this.formularioCliente.value)
    this.db.collection('clientes').add(this.formularioCliente.value).then((termino) => {
      this.mensaje.msjExito('Agregado','Se agregó correctamente')
    }).catch(() => {
      this.mensaje.msjError('Error!','Hubo un problema  al agregar el cliente.Revise si todo esta correcto')
    })
  }

  subirimg(evento: any) {
    if (evento.target.files.length > 0) {
      let namefile = new Date().getTime().toString();
      let file = evento.target.files[0];
      let ext = file.name.toString().substring(file.name.toString().lastIndexOf('.'));
      const filePath = 'clientes/' + namefile + ext;
      const ref = this.storage.ref(filePath);
      const task = ref.put(file);

      task.then((obj) => {
        console.log('imagen subida')
        ref.getDownloadURL().subscribe((url) => {
          this.urlimg = url;
        })
      });

      task.percentageChanges().subscribe((prc = 0) => {
        this.porcentajeSubida = parseInt(prc.toString())
      });
    }
  }

  isRequiredField(field: string): boolean {
    const formControl = this.formularioCliente.get(field);
    return formControl?.errors?.['required'] && formControl?.touched;
  }

  isValidEmail(): boolean {
    const formControl = this.formularioCliente.get('email');
    return formControl?.errors?.['email'] && formControl?.touched;
  }
}


