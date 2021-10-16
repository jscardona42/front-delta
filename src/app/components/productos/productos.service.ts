import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
API = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  createProducto(data: any): Observable<any> {
    return this.http.post(this.API + "/productos/create", data);
  }
}
