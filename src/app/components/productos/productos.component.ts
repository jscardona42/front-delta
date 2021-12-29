import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { ProductosService } from './productos.service';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Productos } from './models/productos';
import swal from 'sweetalert2';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css'],
})
export class ProductosComponent implements OnInit {
  @ViewChild('fileid') fileid!: ElementRef;
  productos: any = [];
  products: any = [];
  fadelete = faTrash;

  constructor(
    public productosService: ProductosService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  fileUpload(event: any) {
    // Se crea un tipo de datos con los párametros que devuelve el producto. (Campos)
    type Productos = {
      nombre: string;
      codigo: string;
      costo: number;
      cantidad: number;
      ipc: number;
      bonificacion: number;
      descuento: number;
    };

    // Esto es sólo para la carga del archivo
    const selectdFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectdFile);
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach((sheet) => {
        try {
          const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        } catch (error) {
          console.log('error');
        }
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        this.productos = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
      });
    };
  }

  createProductos(form: NgForm) {
    this.products.push(form.value);
    form.reset();
  }

  getProductos() {
    this.productosService.getProductos().subscribe(
      (data) => {
        // Guardamos la data dentro de la variable de productos que se declaró arriba
        this.productos = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  cancel() {
    this.productos = [];
    this.fileid.nativeElement.value = '';
  }

  editProductos(producto: Productos) {
    this.productosService.selectedProducto = producto;
  }

  deleteProducto(index: any){
    this.products.splice(index);
    // console.log(index);
    this.getProductos();
    }
    

  sendFile() {
    this.productosService.createProducto(this.productos).subscribe((data) => {
      console.log(data);
    });
    this.productos = [];
    this.fileid.nativeElement.value = '';
    this.toastr.success('OK!', 'Guardado correctamente!');
  }

}
