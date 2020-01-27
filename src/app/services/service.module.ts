import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { ModalUploadService } from '../components/modal-upload/modal-upload.service';
import { SettingsService, 
          SharedService, 
          SidebarService, 
          UsuarioService, 
          LoginGuardService, 
          AdminGuard,
          SubirArchivosService, 
          HospitalService, 
          MedicoService
        } from "./service.index";
        

@NgModule({
  imports: [
    CommonModule, 
    HttpClientModule
  ],
  providers: [
    SettingsService, 
    SharedService, 
    SidebarService, 
    UsuarioService, 
    LoginGuardService,
    AdminGuard, 
    SubirArchivosService, 
    ModalUploadService, 
    HospitalService, 
    MedicoService
  ],
  declarations: []
})
export class ServiceModule { }
