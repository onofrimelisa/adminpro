import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class AdminGuard implements CanActivate {

  constructor( public _us: UsuarioService ){

  }
  
  canActivate(){

    if (this._us.usuario.rol === 'ADMIN_ROL') {
      return true;
    }else{
      console.log('Bloqueado por el ADMIN guard');
      this._us.logout();
      return false;
    }
  }
}
