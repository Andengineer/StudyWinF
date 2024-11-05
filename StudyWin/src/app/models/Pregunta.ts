import { Cuestionario_academico } from "./Cuestionario_academico";

export class Pregunta{
    id_pregunta:number=0
    pregunta:string=""
    puntos:number=0
    respuesta:string=""
    cuestionario:Cuestionario_academico=new Cuestionario_academico()
}