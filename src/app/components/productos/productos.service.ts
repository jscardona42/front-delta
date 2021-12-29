import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Productos } from './models/productos';

@Injectable({
  providedIn: 'root',
})
export class ProductosService {
  selectedProducto = {
    codigo: '',
    nombre: '',
    costo: 0,
    cantidad: 0,
    bonificacion: 0,
    descuento: 0,
    ipc: 0,
    iva: 0,
  };
  API = 'http://localhost:3000/productos';

  constructor(private http: HttpClient) {
    // this.selectedProducto = new Productos();
  }

  // se consume la api del back para obtener todos los productos.
  getProductos(): Observable<any> {
    return this.http.get(this.API + '/get');
  }

  createProducto(data: Productos): Observable<any> {
    return this.http.post(this.API + '/productos/create', data);
  }

  updateProducto(data: Productos) {
    return this.http.put(this.API + '/update', data);
  }

  deleteProducto(codigo: string) {
    console.log(codigo);
    return this.http.delete(this.API + `/delete/${codigo}`);
  }
}
