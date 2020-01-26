import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

import Swal from 'sweetalert2';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';

declare function init_plugins();

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number;
  cargando: boolean = true;

  constructor( public _us: UsuarioService, 
                public _mus: ModalUploadService ) { }

  ngOnInit() {
    init_plugins();
    this.cargarUsuarios();

    // estoy pendiente de si se actualiza una foto para recargar los usuarios
    this._mus.notificacion.subscribe( (resp)=>{
      this.cargarUsuarios();
    })
  }

  cargarUsuarios(){
    this.cargando = true;
    this._us.cargarUsuarios( this.desde )
      .subscribe( (resp: any)=>{
        console.log(resp);
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
        this.cargando = false;
      });
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
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string ){
    
    if (termino.length <= 0) {
      this.cargarUsuarios();
      return;
    }

    this.cargando = true;

    this._us.bsucarUsuarios( termino )
      .subscribe( (usuarios: Usuario[]) => {
        this.usuarios = usuarios;
        this.cargando = false;
      })
    
  }

  borrarUsuario( usuario: Usuario){
    console.log(usuario);

    Swal.fire({
      title: '¿Estas seguro?',
      text: "Estas a punto de eliminar al usuario " + usuario.nombre,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, estoy seguro.', 
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      
      if (result.value) {
        console.log(result);

        this._us.borrarUsuario( usuario._id )
          .subscribe( (resp: any) => {
            this.desde = 0;
            this.cargarUsuarios();
            Swal.fire(
              'La operación se realizó con éxito.',
              'Se eliminó al usuario ' + resp.usuario.nombre,
              'success'
            );
            
          })
      }
    })
  }

  guardarUsuario( usuario: Usuario ){
    this._us.actualizarUsuario( usuario )
      .subscribe( (resp) => {
        Swal.fire({
           title: resp.message,
           text: '',
           icon: 'success',
           confirmButtonText: 'Ok'
        });
      }
      );
  }

  mostrarModal( id:string ){
    this._mus.mostrarModal( 'usuarios', id);
  }

}
