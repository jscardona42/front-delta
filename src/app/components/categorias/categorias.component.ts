import { Component, OnInit } from '@angular/core';
import { CategoriasService } from './categorias.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  categorias: any = [];

  constructor(public categoriasService: CategoriasService) {}

  // Evento que se ejecuta al iniciar la aplicación.
  ngOnInit(): void {
    // llámamos el método de abajo
    this.getCategorias();
  }

  // Llamamos a categoriasService.getCategorias y traemos los datos de las categorias
  getCategorias() {
    this.categoriasService.getCategorias().subscribe((data) => {
      // Guardamos la data dentro de la variable de categorias que se declaró arriba
      this.categorias = data;
    });
  }
}
