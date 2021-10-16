import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { ProductosComponent } from './components/productos/productos.component';
import { SubcategoriasComponent } from './components/subcategorias/subcategorias.component';

const routes: Routes = [
  { path: 'categorias', component: CategoriasComponent },
  { path: 'productos', component: ProductosComponent },
  { path: 'subcategorias', component: SubcategoriasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
