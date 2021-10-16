import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';


@Injectable({
  providedIn: 'root',
})
export class SubcategoriasService {
  API = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  // se consume la api del back para obtener todas las subcategorías.
  getSubCategorias(): Observable<any> {
    return this.http.get(this.API + '/subcategorias/get');
  }
}

