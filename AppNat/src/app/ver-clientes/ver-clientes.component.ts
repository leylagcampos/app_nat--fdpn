import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute, RouterLinkWithHref } from '@angular/router';


@Component({
  selector: 'app-ver-clientes',
  templateUrl: './ver-clientes.component.html',
  styleUrls: ['./ver-clientes.component.scss']
})
export class VerClientesComponent implements OnInit {
  clientes:any[]=new Array<any>();
  constructor(private db:AngularFirestore, private activeRoute: ActivatedRoute) { 
    
  }

  ngOnInit(){
   
    this.clientes.length=0;
    this.db.collection('clientes').get().subscribe((res)=>{
    console.log(res.docs)
    for(let item of res.docs){
      let cliente:any= item.data();
      cliente.id =item.id;
      cliente.ref =item.ref;
      this.clientes.push(cliente);
    }
    });
  }

  eliminar(id:string) {
    
    this.db.doc('clientes/'+id).delete().then((res) => {
      alert("Se elimino correctamente")
      location.reload()
    }).catch(() => {
      alert("error")
    })
  }

}
