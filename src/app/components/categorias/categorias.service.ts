import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // se consume la api del back para obtener todas las categorías.
  getCategorias(): Observable<any> {
    return this.http.get(this.API + '/categorias/get');
  }
}
