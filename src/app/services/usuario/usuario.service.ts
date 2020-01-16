import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../../models/usuario.model';
import { URL_SERVICIOS } from '../../config/config';
import { map } from "rxjs/operators";
import Swal from "sweetalert2";
import { Router } from '@angular/router';

@Injectable()
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor( public http: HttpClient, 
                public router: Router ) { 
    this.cargarStorage();
  }

  // login con google
  loginGoogle( token: string ){
    let url = URL_SERVICIOS + '/login/google';

    return this.http.post( url, { token }).pipe(
      map( (resp: any)=>{
        this.guardarStorage( resp.usuario, resp.token );
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

        this.guardarStorage( resp.usuario, resp.token);

      })
    );
  }

  // logout
  logout(){
    // localStorage.clear(); esta no va porque te borra todo todo
    this.token = '';
    this.usuario = null;
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');

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

  // ###############################################################################
  //										OPERACIONES PRIVADAS
  // ###############################################################################

  private guardarStorage( usuario: Usuario, token: string ){

    localStorage.setItem('id', usuario._id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));

    this.usuario = usuario;
    this.token = token;
    
  }

  private cargarStorage(){
    if ( localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'))  ;
    }else{
      this.token = '';
      this.usuario = null;
    }
  }

}
