import { Curso } from "./Curso";

export class Cuestionario_academico{
    id_cuestionario:number=0
    nombres:string=""
    descripcion:string=""
    tiempo_limite:number=0
    imagen:string=""
    Curso:Curso=new Curso();
}