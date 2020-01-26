import { Component, OnInit } from '@angular/core';
import { SubirArchivosService } from '../../services/subir-archivos/subir-archivos.service';
import { ModalUploadService } from './modal-upload.service';

import Swal from "sweetalert2";

@Component({
  selector: 'app-modal-upload',
  templateUrl: './modal-upload.component.html',
  styles: []
})
export class ModalUploadComponent implements OnInit {

  constructor( public _sas: SubirArchivosService, 
                public _mus: ModalUploadService ) { }

  imagenSubir: File;
  imagenTemp: any; 

  ngOnInit() {
  }

  seleccionarImagen( archivo: File ){

    if ( !archivo ) {
      this.imagenSubir = null;
      return;
    }

    if (archivo.type.indexOf('image') < 0) {
      this.imagenSubir = null;
      Swal.fire({
      title: 'Error',
      text: 'El archivo seleccionado no es una imágen.',
      icon: 'error',
      confirmButtonText: 'Ok'
      });
      return;
    }

    console.log(archivo);
    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL( archivo );

    reader.onloadend = ()=> this.imagenTemp = reader.result
    
  }

  subirImagen(){

    this._sas.subirArchivo( this.imagenSubir, this._mus.tipo, this._mus.id )
      .then( (resp: any)=>{
        console.log(resp);
        
        this._mus.notificacion.emit( (resp) );
        this.cerrarModal();
        Swal.fire({
           title: resp.mensaje,
           text: '',
           icon: 'success',
           confirmButtonText: 'Ok'
        });

      })
      .catch( (err)=>{
        console.log(err);
        
      });

  }

  cerrarModal(){
    this.imagenTemp = null;
    this.imagenSubir = null;
    this._mus.ocultarModal();
  }

}
