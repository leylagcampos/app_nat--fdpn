import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-encabezado',
  templateUrl: './encabezado.component.html',
  styleUrls: ['./encabezado.component.scss']
})
export class EncabezadoComponent implements OnInit {
  horario:String='Horario de Atención: Lunes a Sábado';

  constructor() { }

  ngOnInit(): void {
  }

}
