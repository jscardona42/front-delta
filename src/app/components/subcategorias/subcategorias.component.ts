import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subcategorias } from 'src/app/models/subcategorias.model';
import swal from 'sweetalert2';
import { SubcategoriasService } from './subcategorias.service';
import { MatPaginatorIntl, PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-subcategorias',
  templateUrl: './subcategorias.component.html',
  styleUrls: ['./subcategorias.component.css'],
})
export class SubcategoriasComponent implements OnInit {
  page_size: number = 5;
  page_number: number = 1;

  subcategorias: any = [];
  faedit = faEdit;
  fadelete = faTrash;

  constructor(
    public subcategoriasService: SubcategoriasService,
    private router: Router,
    private toastr: ToastrService,
    private paginator: MatPaginatorIntl
  ) {
    this.paginator.itemsPerPageLabel = "Ítems por página";
  }

  // Evento que se ejecuta al iniciar la aplicación.
  ngOnInit(): void {
    console.log(this.paginator);
    this.getSubcategorias();
  }

  // Llamamos a subcategoriasService.getSubCategorias y traemos los datos de las subcategorias
  getSubcategorias() {
    this.subcategoriasService.getSubcategorias().subscribe(
      (data) => {
        // Guardamos la data dentro de la variable de subcategorias que se declaró arriba
        this.subcategorias = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  saveSubcategoria(form: NgForm) {
    if (!form.valid) {
      this.toastr.error('No deje campos en blanco');
    } else {
      if (form.value.id_subcategoria) {
        // Se llama el servicio y se le envía la form.value
        this.subcategoriasService.updateSubcategoria(form.value).subscribe(
          (data) => {
            this.toastr.success('OK!', 'Actualizado correctamente');
            this.getSubcategorias();
            form.reset();
          },
          (err) => {
            form.reset();
            console.log(err);
            swal.fire('Error', err, 'error');
          }
        );
      } else {
        form.value.id_subcategoria = undefined;
        // Se llama el servicio y se le envía la form.value
        this.subcategoriasService.createSubcategoria(form.value).subscribe(
          (data) => {
            this.toastr.success('OK!', 'Guardado correctamente');
            this.getSubcategorias();
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

  editSubcategoria(subcategoria: Subcategorias) {
    this.subcategoriasService.selectedSubcategoria = subcategoria;
  }

  deleteSubcategoria(id: string) {

    swal.fire({
      title: '',
      text: "¿Está seguro de eliminar la subcategoría",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Sí'
    }).then((result) => {
      if (result.isConfirmed) {
        this.subcategoriasService.deleteSubcategoria(id).subscribe(
          (data) => {
            this.toastr.error('OK!', 'Eliminado correctamente');
            this.getSubcategorias();
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
