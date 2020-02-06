import { Injectable, EventEmitter } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable()
export class SubirArchivosService {

  // notifica que ya se subio la imagen
  public notificacion = new EventEmitter<any>();

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string ){
    
    let url = URL_SERVICIOS + `/upload/${ tipo }/${ id }`;
    
    return new Promise( (resolve, reject)=>{
      let formData = new FormData();
      let xhr = new XMLHttpRequest();
  
      formData.append( 'imagen', archivo, archivo.name );
  
      // configuro la peticion ajax
      xhr.onreadystatechange = function(){
  
        // status 0: no inicializado. Indica que no se ha abierto la conexión con el servidor. No se llamo a open
        // status 1: conexión con servidor establecida. Indica que se ha abierto la conexión pero todavía no se ha enviado la petición. No se llamo a send
        // status 2: recibida petición en servidor. Indica que el servidor ya ha recibido la petición (se ha llamado a send)
        // status 3: enviando información. Se está enviando la información por parte del servidor, todavía no se ha completado la recepción
        // status 4: Se ha recibido la información del servidor y está lista para operar con ella
        
        if (xhr.readyState === 4 ) {
          
          if (xhr.status === 200) {
            console.log('imagen subida');
            resolve( JSON.parse(xhr.response) );
          }else{
            console.log('fallo la subida');
            reject( xhr.response );
          }
        }
      }

      xhr.open('PUT', url, true);
      xhr.send( formData );

    });

  }


}
