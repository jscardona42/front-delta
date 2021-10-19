import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { HttpClientModule } from "@angular/common/http";
import { ProductosComponent } from './components/productos/productos.component';
import { NotifierModule } from 'angular-notifier';
import { SubcategoriasComponent } from './components/subcategorias/subcategorias.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    CategoriasComponent,
    ProductosComponent,
    SubcategoriasComponent,
    UsuariosComponent
  ],
  imports: [
    NotifierModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
