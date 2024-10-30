import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { TipoRecompensa } from '../models/TipoRecompensa';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class TipoDeRecompensaService {
  private url=`${base_url}/tipo_recompensas`

  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<TipoRecompensa[]>(this.url)
  }
}
