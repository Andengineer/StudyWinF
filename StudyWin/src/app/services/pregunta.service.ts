import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Pregunta } from '../models/Pregunta';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class PreguntaService {
  private url=`${base_url}/pregunta`

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Pregunta[]>(this.url)
  }
}
