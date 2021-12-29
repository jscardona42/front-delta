import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Subcategorias } from 'src/app/models/subcategorias.model';


@Injectable({
  providedIn: 'root',
})
export class SubcategoriasService {

  selectedSubcategoria: Subcategorias = {
    nombre: ''
  };
  API = 'http://localhost:3000/subcategorias';

  constructor(private http: HttpClient) {
    this.selectedSubcategoria = new Subcategorias();
  }

  // se consume la api del back para obtener todas las subcategorías.
  getSubcategorias(): Observable<any> {
    return this.http.get(this.API + '/get');
  }

  createSubcategoria(data: Subcategorias): Observable<any> {
    return this.http.post(this.API + '/create', data);
  }

  updateSubcategoria(data: Subcategorias) {
    return this.http.put(this.API + '/update', data);
  }

  deleteSubcategoria(id: string) {
    console.log(id);
    return this.http.delete(this.API + `/delete/${id}`);
  }
}

