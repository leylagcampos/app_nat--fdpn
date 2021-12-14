import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  datosCorrectos: boolean = true;
  errormessage: String = '';

  formularioLogin: FormGroup = this.builderForm.group({
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required]]
  });
  constructor(private builderForm: FormBuilder, private auth: AngularFireAuth) { }

  ngOnInit(): void {

  }

  ingresar() {
    if (this.formularioLogin.valid) {
      this.datosCorrectos = true;
      this.auth
        .signInWithEmailAndPassword(
          this.formularioLogin.value.email,
          this.formularioLogin.value.password
        )
        .then((usuario) => {
          console.log(usuario);
        })
        .catch((error) => {
          this.datosCorrectos = false;
          this.errormessage = "Correo y/o contraseña son incorrectos,porfavor revise e inténtelo denuevo";
        });
    } 
  }
 isRequiredField(field: string): boolean {
  const formControl = this.formularioLogin.get(field);
  return formControl?.errors?.['required'] && formControl?.touched;
  }

  isValidEmail(): boolean {
    const formControl = this.formularioLogin.get('email');
    return formControl?.errors?.['email'] && formControl?.touched; 
  }    
}