import { Injectable } from '@angular/core';
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class MensajesService {

  constructor() { }


  msjError(titulo:string, texto:string){
    Swal.fire({
      title:titulo,
      text:texto,
      icon:'error'})
  }

  msjExito(titulo:string, texto:string){
    Swal.fire({
      title:titulo,
      text:texto,
      icon:'success'})
  }

  msjAdvertencia(titulo:string, texto:string){
    Swal.fire({
      title:titulo,
      text:texto,
      icon:'warning'})
  }
  


 
}
