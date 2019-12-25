import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

interface Ajustes{
  temaUrl: string;
  tema: string;
}

@Injectable()
export class SettingsService {

  ajustes: Ajustes = {
    temaUrl: 'assets/css/colors/default.css',
    tema: 'default'
  };

  constructor( @Inject(DOCUMENT) private _document ) { 
    this.cargarAjustes();
  }

  guardarAjustes(){
    console.log("Guardado en el local storage");
    
    localStorage.setItem('ajustes', JSON.stringify( this.ajustes ));
  }

  cargarAjustes(){
    if (localStorage.getItem('ajustes')) {
      this.ajustes = JSON.parse(localStorage.getItem('ajustes'));
      console.log("Cargando de local Storage");

      this.aplicarTema(this.ajustes.tema);
      
    }else{
      console.log("usando valores por defecto");
      
    }
  }

  aplicarTema( tema:string ){
    let url = `assets/css/colors/${ tema }.css`;
    this._document.getElementById('tema').setAttribute('href', url);

    this.ajustes.tema = tema;
    this.ajustes.temaUrl = url;

    this.guardarAjustes();
  }

}

