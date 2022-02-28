import { DocumentReference } from "@angular/fire/compat/firestore";

export class Cliente{
    id:string | undefined;
    nombre:string='';
    apellido:string='';
    email:string | undefined;
    cel:number | undefined;
    dni:number | undefined;
    imgurl:string | undefined;
    ref: DocumentReference | undefined;
    visible:boolean | undefined;

constructor(){

}
}