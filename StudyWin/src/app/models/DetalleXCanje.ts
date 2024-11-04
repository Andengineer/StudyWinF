import { Canje } from "./Canje";
import { Recompensa } from "./Recompensa";

export class DetalleXCanje{
    id_detalle_canje:number=0;
     id_recompensa:Recompensa=new Recompensa();
    id_canje:Canje=new Canje();
    cantidadProductoCanje:number=0;
}