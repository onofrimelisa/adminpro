import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {


  subscription: Subscription;

  constructor() {

    this.subscription = this.regresaObservable().pipe(
      retry(1)
    )
    .subscribe( numero => console.log("Suscrito, ", numero), 
                    error => console.log("error: ", error), 
                    () => console.log("El observer terminó (complete)")
                    
                  );
   }

  ngOnInit() {
  }

  regresaObservable(): Observable<any>{

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;
      
      let intervalo = setInterval( ()=>{

        contador += 1;

        //queremos retornar un objeto, no solo el contador

        const salida = {
          valor: contador
        };
        
        observer.next( salida );

        // if (contador === 3) {
        //   clearInterval( intervalo );
        //   observer.complete();
        // }
        
        // if (contador === 2) {
        //   clearInterval( intervalo );
        //   observer.error("Aca pongo un msj del error");
        // }
      }, 1000)
    }).pipe( 
      map( resp => {
        return resp.valor;
      }), 
      filter( (valor, index)=>{
        // console.log("Filter", valor, index);
        if ((valor % 2) === 1) {
          // impar
          return true;
        }else{
          // par
          return false;
        }
      })
    )

  }
  
  ngOnDestroy(){
    // cuando salgo de la pagina, quiero que me deje de escuchar el observable

    console.log("La pag se va a cerrar");

    this.subscription.unsubscribe();
    
    
  }
}
