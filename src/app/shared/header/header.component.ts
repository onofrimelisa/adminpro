import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import { Medico } from '../../models/medico.model';
import { Hospital } from '../../models/hospital.model';
import { SubirArchivosService } from '../../services/service.index';
import { MedicoService } from '../../services/medico/medico.service';
import { HospitalService } from '../../services/hospital/hospital.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: []
})
export class HeaderComponent implements OnInit {

  usuario: Usuario;
  medico: Medico;
  hospital: Hospital;
  _usuario: Usuario;
  cargando: boolean = false;

  constructor( public _us: UsuarioService, 
              public _sas: SubirArchivosService, 
              public _ms: MedicoService, 
              public _hs: HospitalService ) { }

  ngOnInit() {
    this.usuario = this._us.usuario;
    this.cargarEntidades();

    // se suscribe para ver el cambio cuando se actualiza una foto
    this._sas.notificacion.subscribe( (resp)=>{
      this.cargarEntidades();
      
    });

    // se suscribe para ver el cambio cuando se crea un médico
    this._ms.notificacion.subscribe( (resp)=>{
      this.cargarEntidades();
      
    });

    // se suscribe para ver el cambio cuando se crea un hospital
    this._hs.notificacion.subscribe( (resp)=>{
      this.cargarEntidades();
      
    })
  }

  cargarEntidades(){
    this.cargando = true;
    this._us.getEntidades().subscribe( (resp: any)=>{
      console.log(resp);
      this._usuario = resp.entidades[0];
      this.medico = resp.entidades[1];
      this.hospital = resp.entidades[2];
      this.cargando = false;
      
      
    });
  }

}
