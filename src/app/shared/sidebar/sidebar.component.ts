import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: []
})
export class SidebarComponent implements OnInit {

  usuario: Usuario;

  constructor( public _ss: SidebarService, 
                public _us: UsuarioService, 
                public router: Router) { }

  ngOnInit() {
    this.usuario = this._us.usuario;
    this._ss.cargarMenu();
  }

  buscar( termino: string ){
    this.router.navigate( ['/busqueda', termino] );
  }

}
