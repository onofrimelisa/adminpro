export class Usuario{
    constructor( public nombre: string,
                 public email: string,
                 public password: string,
                 public fecha_nacimiento: Date,
                 public img?: string,
                 public google?: string,
                 public rol?: string,
                 public _id?: string,
                ){

    }
}