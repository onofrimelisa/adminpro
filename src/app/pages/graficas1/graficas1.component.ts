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

    if (this._us.usuario.rol === 'ADMIN_ROL') {
      this._gs.dashboardAdmin()
      .subscribe( (resp: any)=>{
        this.graficos = resp.graficos;
        this.cargando = false;
      
      })
    }else{
      console.log('no es admin, falta hacer su dashboard');
      
    }
  }

  ngOnInit() {
    
    
  }

}
