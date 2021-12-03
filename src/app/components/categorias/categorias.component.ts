import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Categorias } from 'src/app/model/categorias.model';
import swal from 'sweetalert2';
import { CategoriasService } from './categorias.service';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css'],
})
export class CategoriasComponent implements OnInit {
  page_size: number = 5;
  page_number: number = 1;

  categorias: any = [];
  faedit = faEdit;
  fadelete = faTrash;

  constructor(
    public categoriasService: CategoriasService,
    private router: Router,
    private toastr: ToastrService,
    private paginator: MatPaginatorIntl
  ) {
    this.paginator.itemsPerPageLabel = "Ítems por página";
  }

  // Evento que se ejecuta al iniciar la aplicación.
  ngOnInit(): void {
    console.log(this.paginator);
    this.getCategorias();
  }

  // Llamamos a subcategoriasService.getSubCategorias y traemos los datos de las subcategorias
  getCategorias() {
    this.categoriasService.getCategorias().subscribe(
      (data) => {
        // Guardamos la data dentro de la variable de categorias que se declaró arriba
        this.categorias = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  saveCategoria(form: NgForm) {
    if (!form.valid) {
      this.toastr.error('No deje campos en blanco');
    } else {
      if (form.value.id_categoria) {
        // Se llama el servicio y se le envía la form.value
        this.categoriasService.updateCategoria(form.value).subscribe(
          (data) => {
            this.toastr.success('OK!', 'Actualizado correctamente');
            this.getCategorias();
            form.reset();
          },
          (err) => {
            form.reset();
            console.log(err);
            swal.fire('Error', err, 'error');
          }
        );
      } else {
        form.value.id_categoria = undefined;
        // Se llama el servicio y se le envía la form.value
        this.categoriasService.createCategoria(form.value).subscribe(
          (data) => {
            this.toastr.success('OK!', 'Guardado correctamente');
            this.getCategorias();
            form.reset();
          },
          (err) => {
            form.reset();
            console.log(err);
            swal.fire('Error', err, 'error');
          }
        );
      }

    }
  }

  editCategoria(categoria: Categorias) {
    this.categoriasService.selectedCategoria = categoria;
  }

  deleteCategoria(id: string) {

    swal.fire({
      title: '',
      text: "¿Está seguro de eliminar la categoría",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriasService.deleteCategoria(id).subscribe(
          (data) => {
            this.toastr.error('OK!', 'Eliminado correctamente');
            this.getCategorias();
          },
          (err) => {
            console.log(err);
            swal.fire('Error', err, 'error');
          }
        )
      }
    })
  }

  handlePage(evt: PageEvent) {
    this.page_size = evt.pageSize;
    this.page_number = evt.pageIndex + 1;
  }
}
