import { DocumentReference } from "@angular/fire/compat/firestore";

export class Inscripcion{
    fecha: Date | undefined;
    fechaFinal:Date | undefined;
    precio:DocumentReference | undefined;
    cliente: DocumentReference | undefined;
    subTotal:number | undefined;
    igv:number | undefined;
    total:number | undefined;
    constructor(){
        this.fecha=this.fecha;
        this.fechaFinal =this.fechaFinal;
        this.precio=this.precio;
        this.cliente=this.cliente;
        this.subTotal=this.subTotal;
        this.total=this.total;

    }
}