import { Canje } from "./Canje";
import { Recompensa } from "./Recompensa";

export class DetalleXCanje{
    id_detalle_canje:number=0;
    recompensa:Recompensa=new Recompensa();
    canje:Canje=new Canje();
    cantidadProductoCanje:number=0;
}