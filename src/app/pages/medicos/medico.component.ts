import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Hospital } from '../../../../Material-de-la-tarea-Seccio-n-16/hospital.model';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router, ActivatedRoute } from '@angular/router';

// ACTIVATED ROUTE se usa para leer los parametros de la url 

import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: []
})
export class MedicoComponent implements OnInit {

  hospitales: Hospital[] = [];
  medico: Medico = new Medico('', this._us.usuario._id, '');
  hospital: Hospital = new Hospital('');

  constructor( public _hs: HospitalService, 
              public _ms: MedicoService, 
              public _us: UsuarioService, 
              public router: Router, 
              public activatedRoute: ActivatedRoute, 
              public _mus: ModalUploadService  ) {

    activatedRoute.params.subscribe( params => {
      let id = params['id'];
      if (id !== 'nuevo') {
        this.cargarMedico( id );
      }
    })          
  }

  ngOnInit( ) {
    this._hs.cargarHospitales( 0 )
      .subscribe( (resp: any)=>{
        this.hospitales = resp.hospitales;
      });

    this._mus.notificacion.subscribe( resp => {
      this.medico.img = resp.medico.img;
      
    })
  }

  guardarMedico( f: NgForm ){
    
    this.medico.nombre = f.form.value.nombre;
    this.medico.hospital = f.form.value.hospital;

    this._ms.guardarMedico( this.medico )
      .subscribe( (resp: any)=>{
        this.medico = resp.medico;
        Swal.fire({
           title: 'Operación realizada con éxito',
           text: resp.message,
           icon: 'success',
           confirmButtonText: 'Ok'
        });

        this.router.navigate(['/medico', this.medico._id])
      });
    
  }

  cambioHospital( id: string ){
    this._hs.obtenerHospital( id )
      .subscribe( (resp: any)=>{
        this.hospital = resp;
        
      });
    
  }

  cargarMedico( id: string ){
    this._ms.cargarMedico( id )
      .subscribe( (medico)=>{
        
        this.medico = medico;
        this.medico.hospital = medico.hospital._id;
        // actualizo el hospital
        this.cambioHospital( this.medico.hospital );
        
      })
  }

  cambiarFoto(){
    this._mus.mostrarModal('medicos', this.medico._id);
  }
}
