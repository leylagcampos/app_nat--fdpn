import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-ver-clientes',
  templateUrl: './ver-clientes.component.html',
  styleUrls: ['./ver-clientes.component.scss']
})
export class VerClientesComponent implements OnInit {
  clientes:any[]=new Array<any>();
  constructor(private db:AngularFirestore) { 
    
  }

  ngOnInit(){
    /*this.db.collection('clientes').valueChanges().subscribe(res=>{
      this.clientes=res;
      console.log(res)
    });
    */
    this.clientes.length=0;
    this.db.collection('clientes').get().subscribe((res)=>{
     
      console.log(res.docs)

       /* 
       res.docs.forEach((item)=>{
        console.log(item.id)
        console.log(item.data())
        console.log(item.ref)
        })
       */
      
     
      for(let item of res.docs){
        let cliente:any= item.data();
        cliente.id =item.id;
        cliente.ref =item.ref;
        this.clientes.push(cliente);
      }

    });
  }

}
