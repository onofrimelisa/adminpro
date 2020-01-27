import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

import Swal from 'sweetalert2';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  auth2: any;

  constructor( public router: Router, 
              public _us: UsuarioService ) { 
    
  }

  ngOnInit() {
    init_plugins();
    this.googleInit();

    this.email = localStorage.getItem('email') || '';
    if (localStorage.getItem('email')) {
      this.recuerdame = true;
    }
  }

  googleInit(){

    gapi.load('auth2', ()=>{
      this.auth2 = gapi.auth2.init({
        client_id: '649654614403-2pqmohvgad4b32g75pfcikk3dhuc5m2d.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin', 
        scope: 'profile email'
      });

      this.attachSignIn( document.getElementById( 'btnGoogle'));
    })
  }

  attachSignIn( element ){
    this.auth2.attachClickHandler( element, {}, (googleUsr)=>{
      let token = googleUsr.getAuthResponse().id_token;
      console.log(token);
      
      // ya puede iniciar sesion
      this._us.loginGoogle( token )
        .subscribe( (resp) =>{
          window.location.href = '#/dashboard'
          
        })
    })
  }

  ingresar( f: NgForm){

    if (f.invalid) {
      return;
    }

    let usuario = new Usuario(null, f.value.email, f.value.password);

    this._us.login( usuario, f.value.recuerdame )
      .subscribe( 
        
        ( resp ) => this.router.navigate(['/dashboard']), 
        
        err => {
          Swal.fire({
          title: 'Error al iniciar sesión',
          text: err.error.message,
          icon: 'error',
          confirmButtonText: 'Ok'
          });
        }
      
      );
    
    
  }

}
