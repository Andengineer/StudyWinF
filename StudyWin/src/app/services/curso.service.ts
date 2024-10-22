import { Injectable } from '@angular/core';
import { Curso } from '../models/Curso';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class CursoService {
  private url=`${base_url}/curso`
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Curso[]>(this.url)
  }
}
