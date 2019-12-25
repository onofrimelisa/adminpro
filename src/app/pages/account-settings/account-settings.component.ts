import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  // con esta variable tenemos acceso a todo el DOM
  constructor( public _ajustes: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor( tema:string, link:any){

    this._ajustes.aplicarTema(tema);

    this.aplicarCheck(link);
  }


  aplicarCheck( link:any ){
    let selectores: any = document.getElementsByClassName('selector');

    for (let ref of selectores) {
      ref.classList.remove('working');
      
    }

    link.classList.add('working');
  }

  colocarCheck(){
    let selectores: any = document.getElementsByClassName('selector');
    let tema = this._ajustes.ajustes.tema;

    for (let ref of selectores) {
      if ( ref.getAttribute('data-theme') == tema) {
        ref.classList.add('working');

        break;
      }
      
    }
  }
}
