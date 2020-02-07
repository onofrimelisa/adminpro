import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/hospital/hospital.service';
import { Hospital } from '../../models/hospital.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Medico } from '../../models/medico.model';


@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css']
})
export class HospitalComponent implements OnInit {
  cargando: boolean = false;
  hospital: Hospital;
  medicos: number;
  graficos: any;

  constructor( public _hs: HospitalService, 
                public activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe( params => {
      let id = params['id'];
      this.cargarHospital(id);
    });
  }

  cargarHospital( id: string){
    this.cargando = true;
    this._hs.obtenerHospital( id )
      .subscribe( (resp: any)=> {
        this.hospital = resp.hospital;
        this.medicos = resp.medicos;
        this.graficos = resp.graficos;
        this.cargando = false;
        console.log(resp);
        
        
      });

  }

}
