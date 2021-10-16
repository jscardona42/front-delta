import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { HttpClientModule } from "@angular/common/http";
import { ProductosComponent } from './components/productos/productos.component';
import { NotifierModule } from 'angular-notifier';
import { SubcategoriasComponent } from './components/subcategorias/subcategorias.component';

@NgModule({
  declarations: [
    AppComponent,
    CategoriasComponent,
    ProductosComponent,
    SubcategoriasComponent
  ],
  imports: [
    NotifierModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
