import { Usuario } from "./Usuario";

export class Canje{
    id_canje:number=0;
    fecha: Date=new Date(Date.now());
    departamento:string='';
    distrito:string='';
    Usuario:Usuario=new Usuario();
}