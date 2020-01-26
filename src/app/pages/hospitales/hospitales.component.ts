import { Component, OnInit } from '@angular/core';
import { Hospital } from "../../models/hospital.model";
import { HospitalService } from '../../services/service.index';
import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare function init_plugins();

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styleUrls: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [];
  cargando: boolean = false;
  totalRegistros: number;
  desde: number = 0;
  hospital: Hospital;

  constructor( public _hs: HospitalService, 
                public _mus: ModalUploadService ) { }

  ngOnInit() {
    init_plugins();
    this.cargarHospitales();

    // estoy pendiente de si se actualiza una foto para recargar los usuarios
    this._mus.notificacion.subscribe( (resp)=>{
      this.cargarHospitales();
    })
  }

  cargarHospitales(){
    this.cargando = true;
    this._hs.cargarHospitales( this.desde )
      .subscribe( (resp: any) =>{
        console.log(resp);
        this.totalRegistros = resp.total;
        this.hospitales = resp.hospitales;
        this.cargando = false;
        
      })

  }

  cambiarDesde( valor: number ){

    let aux = this.desde + valor;

    if (aux >= this.totalRegistros) {
      return;
    }

    if (aux < 0) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();
  }

  actualizarHospital( h: Hospital ){
    this._hs.actualizarHospital( h )
      .subscribe( (resp: any)=> {
        Swal.fire({
           title: resp.message,
           text: '',
           icon: 'success',
           confirmButtonText: 'Ok'
        });
        
      });
    
  }

  borrarHospital( h: Hospital ){
    Swal.fire({
       title: '¿Estas seguro?',
       text: 'Se eliminará el hospital: ' + h.nombre,
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Si, estoy seguro.',
       cancelButtonText: 'Cancelar'
    })
    .then( (result) => {
       if (result.value) {
        this._hs.borrarHospital( h._id )
          .subscribe( (resp: any)=> {
            Swal.fire({
               title: resp.message,
               text: '',
               icon: 'success',
               confirmButtonText: 'Ok'
            });
            this.cargarHospitales();
          })
           
       }
    });
  }

  mostrarModal( id: string ){
    this._mus.mostrarModal( 'hospitales', id );
  }

  buscarHospital( termino: string ){
    
    if (termino.length <= 0) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hs.buscarHospitales( termino )
      .subscribe( (hospitales: Hospital[]) => {
        this.hospitales = hospitales;
        this.cargando = false;
      })
    
  }

  agregarHospital( ){
    Swal.fire({
      title: 'Ingrese el  nombre del hospital',
      input: 'text',
      inputPlaceholder: 'Nombre del hospital', 
      showCancelButton: true,
      cancelButtonText: 'Cancelar', 
      confirmButtonText: 'Agregar hospital'
    })
    .then( (result) => {
      if (result.value) {
       this._hs.crearHospital( result.value )
       .subscribe( (resp: any)=>{
         
         Swal.fire({
            title: 'Hospital agregado con éxito',
            text: '',
            icon: 'success',
            confirmButtonText: 'Ok'
         });
         this.cargarHospitales();
       });
       
          
      }
   });    
  }

  obtenerHospital( id: string ){
    this._hs.obtenerHospital( id )
      .subscribe( (resp: any) => {
        this.hospital = resp.hospital
      })
  }

}
