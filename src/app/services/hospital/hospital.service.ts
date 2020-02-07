import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Hospital } from '../../models/hospital.model';
import { map } from "rxjs/operators";

@Injectable()
export class HospitalService {

  constructor( public http: HttpClient, 
                public _us: UsuarioService ) { }

  cargarHospitales( desde: number ){
    let url = URL_SERVICIOS + '/hospital?desde=' + desde;
    return this.http.get( url );
  }

  obtenerHospital( id: string ){
    let url = URL_SERVICIOS + '/hospital/' + id;
    return this.http.get( url );
  }

  borrarHospital( id: string ){
    let url = URL_SERVICIOS + '/hospital/' + id;
    url += ('?token=' + this._us.token);
    return this.http.delete( url );
  }

  crearHospital( nombre: string ){
    let hospital = new Hospital( nombre, this._us.usuario );
    let url = URL_SERVICIOS + '/hospital';
    url += ('?token=' + this._us.token);

    return this.http.post( url, hospital );
  }

  buscarHospitales( termino: string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino;
    return this.http.get( url ).pipe(
      map( (resp: any) => {
        return resp.hospitales;
      })
    );
  }

  actualizarHospital( hospital: Hospital ){
    let url = URL_SERVICIOS + '/hospital/' + hospital._id;
    url += ('?token=' + this._us.token);
    return this.http.put( url, hospital );
  }

}
