import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable()
export class LoginGuardService implements CanActivate{

  constructor( public _us: UsuarioService ,
              public router: Router) { }

  canActivate(): boolean{

    if (this._us.estaLoggeado()) {
      return true;
    }

    console.log('no paso por el guard');
    this.router.navigate(['/login']);
    return false;

  }

}
