import { Component, OnInit } from '@angular/core';
import { SubcategoriasService } from './subcategorias.service';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.css'],
})
export class SubcategoriasComponent implements OnInit {
  subcategorias: any = [];

  constructor(public subcategoriasService: SubcategoriasService) {}

  // Evento que se ejecuta al iniciar la aplicación.
  ngOnInit(): void {
    // llámamos el método de abajo
    this.getSubCategorias();
  }

  // Llamamos a subcategoriasService.getSubCategorias y traemos los datos de las subcategorias
  getSubCategorias() {
    this.subcategoriasService.getSubCategorias().subscribe((data) => {
      // Guardamos la data dentro de la variable de subcategorias que se declaró arriba
      this.subcategorias = data;
    });
  }
}
