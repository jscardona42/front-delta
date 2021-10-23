import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  API = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  signIn(data: any): Observable<any> {
    return this.http.post(this.API + "/usuarios/iniciarsesion", data);
  }
  createUsuarios(data: any): Observable<any> {
    return this.http.post(this.API + "/usuarios/create", data);

  }

}
