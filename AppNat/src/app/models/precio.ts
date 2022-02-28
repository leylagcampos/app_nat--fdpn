import { DocumentReference } from "@angular/fire/compat/firestore";

export class Precio{
    id:string | undefined;
    nombreplan:string | undefined;
    precio:number | undefined;
    dias:string | undefined;
    cntclases:number | undefined;
    ref: DocumentReference | undefined;
    

}