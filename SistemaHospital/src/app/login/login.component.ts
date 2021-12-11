import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ErrorFactory } from '@firebase/util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  datosCorrectos: boolean = true;
  errormessage: String = '';

  formularioLogin: FormGroup = this.builderForm.group({
    email: ['', Validators.compose([Validators.required, Validators.email])],
    password: ['', Validators.required]
  });
  constructor(private builderForm: FormBuilder, private auth: AngularFireAuth) { }

  ngOnInit(): void {

  }

  ingresar() {
    if (this.formularioLogin.valid) {
      this.datosCorrectos = true;
      this.auth.signInWithEmailAndPassword(this.formularioLogin.value.email, this.formularioLogin.value.password).catch((error)=>{
        this.datosCorrectos = false;
        //this.errormessage = error.message;
        this.errormessage="El correo o contraseña están incorrectos, porfavor intentelo denuevo";
      })
    }
    
  }
}