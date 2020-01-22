import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public oculto: string = 'oculto';

  // notifica que ya se subio la imagen
  public notificacion = new EventEmitter<any>();

  constructor() { }

  ocultarModal(){
    this.tipo = null;
    this.id = null;
    this.oculto = 'oculto';

  }

  mostrarModal( tipo: string, id: string){
    this.id = id;
    this.tipo = tipo;
    this.oculto = '';
  }


}
