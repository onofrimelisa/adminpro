import { Component, OnInit } from '@angular/core';
import { SettingsService } from './services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements OnInit{
  title = 'app';

  constructor( public _ajustes: SettingsService ){
    
  }

  ngOnInit(){
    Swal.fire({
      title: 'Sobre esta aplicación:',
      text: 'Realizada con fines sólo ilustrativos, para demostrar el uso de distintas tecnologías. Los datos ingresados estarán seguros.',
      icon: 'info',
      confirmButtonText: 'Entendido.'
   });
  }
}
