import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
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

  constructor(public productosService: ProductosService) { }

  ngOnInit(): void {
  }

  fileUpload(event: any) {

    type Productos = {
      nombre: string,
      codigo: string,
      costo: number,
      cantidad: number,
      ipc2: number,
      bonificacion: number,
      descuento: number,
    }

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
    alert("Guardado correctamente");
  }

}
