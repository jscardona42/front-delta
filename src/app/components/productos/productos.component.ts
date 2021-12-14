import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as XLSX from 'xlsx';
import { ProductosService } from './productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})

export class ProductosComponent implements OnInit {

  @ViewChild('fileid') fileid!: ElementRef;
  productos: any = [];
  constructor(
    public productosService: ProductosService,
    private toastr: ToastrService
    ) { }

  ngOnInit(): void {
  }

  fileUpload(event: any) {

    // Se crea un tipo de datos con los párametros que devuelve el producto. (los atributos o campos)
    type Productos = {
      nombre: string,
      codigo: string,
      costo: number,
      cantidad: number,
      ipc: number,
      bonificacion: number,
      descuento: number,
    }

    // Esto es sólo para la carga del archivo
    const selectdFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectdFile);
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach(sheet => {
        try {
          const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        } catch (error) {
          console.log('error');
        }
        const data = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        this.productos = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
      })
    }
  }

  cancel() {
    this.productos = [];
    this.fileid.nativeElement.value = "";
  }

  sendFile() {
    this.productosService.createProducto(this.productos).subscribe(data => {
      console.log(data);
    });
    this.productos = [];
    this.fileid.nativeElement.value = "";
    this.toastr.success('OK!', 'Guardado correctamente!');
  }

}
