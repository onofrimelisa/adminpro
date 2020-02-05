import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  medicos: Medico[] = [];
  cargando: boolean = false;
  totalRegistros: number;
  desde: number = 0;
  medico: Medico;

  constructor( public _ms: MedicoService ) { }

  ngOnInit() {
    this.cargarMedicos();
  }

  cargarMedicos(){
    this.cargando = true;
    this._ms.cargarMedicos( this.desde )
      .subscribe( (resp: any) => {
        console.log(resp);
        
        this.totalRegistros = resp.total;
        this.medicos = resp.medicos;
        this.cargando = false;
        
      })
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
    this.cargarMedicos();
  }

  borrarMedico( m: Medico ){
    Swal.fire({
       title: '¿Estas seguro?',
       text: 'Se eliminará el médico: ' + m.nombre,
       icon: 'warning',
       showCancelButton: true,
       confirmButtonColor: '#3085d6',
       cancelButtonColor: '#d33',
       confirmButtonText: 'Si, estoy seguro.',
       cancelButtonText: 'Cancelar'
    })
    .then( (result) => {
       if (result.value) {
        this._ms.borrarMedico( m._id )
          .subscribe( (resp: any)=> {
            Swal.fire({
               title: resp.message,
               text: '',
               icon: 'success',
               confirmButtonText: 'Ok'
            });
            this.cargarMedicos();
          })
           
       }
    });
  }

  buscarMedico( termino: string){

    if (termino.length === 0) {
      this.cargarMedicos();
      return;
    }
    this._ms.buscarMedicos( termino )
      .subscribe( (medicos: Medico[])=>{
        this.medicos = medicos;
    })
  }

}
