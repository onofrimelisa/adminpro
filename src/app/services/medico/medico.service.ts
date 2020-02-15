import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { map } from 'rxjs/operators';
import { Medico } from '../../models/medico.model';

@Injectable()
export class MedicoService {

  public notificacion = new EventEmitter<any>();

  constructor( public http: HttpClient, 
                public _us: UsuarioService ) { }

  cargarMedicos( desde: number ){

    let url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get( url );

  }

  borrarMedico( id: string ){
    let url = URL_SERVICIOS + '/medico/' + id;
    url += '?token=' + this._us.token;

    return this.http.delete(url);
  }

  buscarMedicos( termino: string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get( url ).pipe(
      map( (resp: any) => {
        return resp.medicos;
      })
    );
  }

  guardarMedico( medico: Medico ){

    let url = URL_SERVICIOS + '/medico';
    
    if (medico._id) {
      // actualizo
      url += '/' + medico._id;
      url += ('?token=' + this._us.token);

      return this.http.put( url, medico );

    }else{
      url += ('?token=' + this._us.token);
      return this.http.post( url, medico );

    }

  }

  cargarMedico( id: string ){
    let url = URL_SERVICIOS + '/medico/' + id;
    return this.http.get( url ).pipe(
      map( (resp: any)=>{
        return resp.medico;
      })
    );
  }


}
