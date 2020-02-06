import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { map } from "rxjs/operators";
import Swal from "sweetalert2";
import { Router } from '@angular/router';
import { SubirArchivosService } from '../subir-archivos/subir-archivos.service';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor( public http: HttpClient, 
                public router: Router, 
                public _sas: SubirArchivosService ) { 
    this.cargarStorage();
  }

  // login con google
  loginGoogle( token: string ){
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token }).pipe(
      map( (resp: any)=>{
        console.log(resp);
        this.usuario = resp.usuario;
        this.guardarStorage( resp.usuario, resp.token, resp.menu );
        
        return resp;
      })
    );
  }

  // login normal
  login(  usuario: Usuario, recordarme: boolean ){
    
    let url = URL_SERVICIOS + '/login';

    if (recordarme) {
      localStorage.setItem('email', usuario.email);
    }else{
      localStorage.removeItem('email');
    }

    return this.http.post( url, usuario ).pipe(
      map( (resp: any)=>{        
        
        this.guardarStorage( resp.usuario, resp.token,resp.menu);
        this.usuario = resp.usuario;

      })
    );
  }

  // logout
  logout(){
    // localStorage.clear(); esta no va porque te borra todo todo
    this.token = '';
    this.usuario = null;
    this.menu = [];
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);  
  }

  crearUsuario( usuario: Usuario ){

    let url = URL_SERVICIOS + '/usuario';

    return this.http.post(url, usuario).pipe( 
      map((resp: any)=>{
      Swal.fire({
        title: 'Usuario creado correctamente',
        text: 'Ya puedes iniciar sesión.',
        icon: 'success',
        confirmButtonText: 'Ok'
      });
      return resp.usuario;
    }

    ));
  }

  estaLoggeado(){

    return (this.token.length > 1) ? true: false;
    
  }

  actualizarUsuario( usuario: Usuario ){
    let url = URL_SERVICIOS + '/usuario/' + usuario._id;
    url += '?token=' + this.token;

    return this.http.put( url, usuario).pipe(
      map( (resp: any) =>{

        if ( usuario._id === this.usuario._id) {
          this.guardarStorage( resp.usuario, this.token, this.menu );
          
        }

        return resp;
      })
    );
    
  }

  cambiarImagen( archivo: File, id: string ){
    this._sas.subirArchivo(archivo, 'usuarios', id)
      .then( (resp: any) =>{
        this._sas.notificacion.emit(resp);
        this.usuario.img = resp.usuario.img;
        Swal.fire({
        title: resp.mensaje,
        text: '',
        icon: 'success',
        confirmButtonText: 'Ok'
        });

        this.guardarStorage( this.usuario, this.token, this.menu );
        
      })
      .catch( (err) => console.log(err)
      )
  }

  // GET DE USUARIOS
  cargarUsuarios( desde: number = 0){
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;
    return this.http.get(url);
  }

  bsucarUsuarios( termino: string ){
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
    return this.http.get( url ).pipe(
      map( (resp: any) => {
        return resp.usuarios;
      })
    );
  }

  borrarUsuario( id: string ){
    let url = URL_SERVICIOS + '/usuario/' + id;
    url += '?token=' + this.token;

    return this.http.delete(url);
  }

  getEntidades(){
    let url = URL_SERVICIOS + '/entidades';
    url += '?token=' + this.token;
    return this.http.get(url);
  }

  // ###############################################################################
  //										OPERACIONES PRIVADAS
  // ###############################################################################

  private guardarStorage( usuario: Usuario, token: string, menu: any ){

    localStorage.setItem('id', usuario._id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
    
  }

  private cargarStorage(){
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'))  ;
      this.menu = JSON.parse(localStorage.getItem('menu'))  ;
    }else{
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

}
