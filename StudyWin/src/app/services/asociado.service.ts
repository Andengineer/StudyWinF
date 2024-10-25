import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Asociado } from '../models/Asociado';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class AsociadoService {
  private url=`${base_url}/asociado`

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Asociado[]>(this.url)
  }
}
