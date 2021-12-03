import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Categorias } from 'src/app/model/categorias.model';


@Injectable({
  providedIn: 'root',
})
export class CategoriasService {

  selectedCategoria: Categorias = {
    nombre: ''
  };
  API = 'http://localhost:3000/categorias';

  constructor(private http: HttpClient) {
    this.selectedCategoria = new Categorias();
  }

  // se consume la api del back para obtener todas las categorías.
  getCategorias(): Observable<any> {
    return this.http.get(this.API + '/get');
  }

  createCategoria(data: Categorias): Observable<any> {
    return this.http.post(this.API + '/create', data);
  }

  updateCategoria(data: Categorias) {
    return this.http.put(this.API + '/update', data);
  }

  deleteCategoria(id: string) {
    console.log(id);
    return this.http.delete(this.API + `/delete/${id}`);
  }
}


