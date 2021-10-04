import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root'
})
export class CategoriasService {

  constructor(private http: HttpClient) {
  }

  getCategorias(): Observable<any> {
    return this.http.get("http://localhost:3005/categorias/get");
  }
}
