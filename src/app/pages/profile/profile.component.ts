import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/service.index';
import { Usuario } from '../../models/usuario.model';
import  Swal  from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: any;

  constructor( public _us: UsuarioService ) { 
    this.usuario = this._us.usuario;
    
    
  }

  ngOnInit() {
  }

  guardar( usuario: Usuario ){

    if ( !this.usuario.google ) {
      this.usuario.nombre = usuario.nombre;
      this.usuario.email = usuario.email;
      this.usuario.fecha_nacimiento = usuario.fecha_nacimiento;
  
      this._us.actualizarUsuario( this.usuario )
        .subscribe( resp => {
          
          Swal.fire({
          title: resp.message,
          text: 'Ya puedes ver los cambios en tu perfil.',
          icon: 'success',
          confirmButtonText: 'Entendido'
          });
          
        }, 
        ( err: any )=> {
          Swal.fire({
             title: err.error.mensaje,
             text: 'El email ingresado ya existe.',
             icon: 'error',
             confirmButtonText: 'Entendido'
          });
        } );
      
    }
    
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

  cambiarImagen(){
    this._us.cambiarImagen( this.imagenSubir, this.usuario._id );
  }

}
