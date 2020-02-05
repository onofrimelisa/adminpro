import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class GraficasService {

  constructor( public _us: UsuarioService, 
              public http: HttpClient ) { }

  getDashboard(){
    let url = URL_SERVICIOS + '/usuario/dashboard/' + this._us.usuario._id;
    url += '?token=' + this._us.token;

    return this.http.get( url );
  }

}
