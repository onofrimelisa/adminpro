import { Component, OnInit } from '@angular/core';
import { GraficasService } from '../../services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';

@Component({
  selector: 'app-graficas1',
  templateUrl: './graficas1.component.html',
  styles: []
})
export class Graficas1Component implements OnInit {


  graficos: any;
  cargando: boolean = false;

  constructor( public _gs: GraficasService, 
               public _us: UsuarioService ) { 
    this.cargando = true;

      this._gs.getDashboard()
      .subscribe( (resp: any)=>{
        this.graficos = resp.graficos;
        this.cargando = false;
      
      })
  }

  ngOnInit() {
    
    
  }

}
