import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Role } from '../models/Role';
import { environment } from '../../environments/environment';
import { Subject } from 'rxjs';
const base_url=environment.base
@Injectable({
  providedIn: 'root'
})
export class RolService {
  private url=`${base_url}/rol`
  constructor(private http:HttpClient) { }
  insert(ro:Role){
    return this.http.post(this.url,ro)
  }
}
