import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CategoriasComponent } from './components/categorias/categorias.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { ProductosComponent } from './components/productos/productos.component';
import { NotifierModule } from 'angular-notifier';
import { SubcategoriasComponent } from './components/subcategorias/subcategorias.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { JwtModule } from '@auth0/angular-jwt';
import { TokeninterceptorService } from './components/auth/tokeninterceptor.service';
import { PaginatePipe } from './pipes/paginate.pipe';
import { MatPaginatorModule } from '@angular/material/paginator';

export function tokenGetter() {
  return localStorage.getItem("token");
}

@NgModule({
  declarations: [
    AppComponent,
    CategoriasComponent,
    ProductosComponent,
    SubcategoriasComponent,
    UsuariosComponent,
    PaginatePipe
  ],
  imports: [
    NotifierModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    FontAwesomeModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ["*"],
        disallowedRoutes: [""],
      },
    }),
    MatPaginatorModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokeninterceptorService, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
