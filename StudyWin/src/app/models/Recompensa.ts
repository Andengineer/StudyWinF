import { Asociado } from "./Asociado";
import { TipoRecompensa } from "./TipoRecompensa";

export class Recompensa{
    id_recompensa:number=0
    nombre:string=""
    descripcion:string=""
    puntos:number=0
    stock:number=0
    imagen:string=""
    Asociado:Asociado=new Asociado();
    TipoRecompensa:TipoRecompensa=new TipoRecompensa()
}