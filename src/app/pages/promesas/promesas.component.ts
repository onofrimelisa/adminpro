import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() { 

    this.contarSegundos().then( 

      ()=> console.log("termino con exito")

    ).catch( 

      (err) => console.log("error: ", err)

    );
  }

  ngOnInit() {
  }

  contarSegundos(): Promise<string>{
    return new Promise( (resolve, reject) =>{
      
      let contador = 0;

      let intervalo = setInterval( ()=>{
        contador += 1;
        console.log(contador);
        

        if (contador === 3) {
          reject("Aca explico el error");
          //hago que deje de contar el contador
          clearInterval(intervalo);
        }
      }, 1000);
    });
  
  }

}
