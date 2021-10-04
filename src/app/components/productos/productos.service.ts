import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  constructor(private http: HttpClient) { }

  createProducto(data: any): Observable<any>  {
    return this.http.post("http://localhost:3005/productos/create", data);
  }
}
