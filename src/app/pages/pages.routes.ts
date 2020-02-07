import { RouterModule, Routes } from '@angular/router';
import { Graficas1Component } from './graficas1/graficas1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { HospitalComponent } from './hospitales/hospital.component';



const pagesRoutes: Routes = [

    { path: 'dashboard', component: Graficas1Component, data: {titulo: 'Dashboard'} },
    { path: 'settings', component: AccountSettingsComponent, data: {titulo: 'Settings'} },
    { path: 'profile', component: ProfileComponent, data: {titulo: 'Perfil'} },
    { path: 'busqueda/:termino', component: BusquedaComponent, data: {titulo: 'Buscador'} },
    { path: 'usuarios', component: UsuariosComponent,data: {titulo: 'Mantenimiento de usuarios'} },
    { path: 'hospitales', component: HospitalesComponent, data: {titulo: 'Mantenimiento de hospitales'} },
    { path: 'hospital/:id', component: HospitalComponent, data: {titulo: 'Datos del hospital'} },
    { path: 'medicos', component: MedicosComponent, data: {titulo: 'Mantenimiento de médicos'} },
    { path: 'medico/:id', component: MedicoComponent, data: {titulo: 'Actualizar médico'} },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }

];


export const PAGES_ROUTES = RouterModule.forChild( pagesRoutes );
