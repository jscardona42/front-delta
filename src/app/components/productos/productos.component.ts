import { Component, OnInit } from '@angular/core';
import * as XLSX from 'xlsx';
import { ProductosService } from './productos.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {


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
    // console.log(event.target.files);
    const selectdFile = event.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsBinaryString(selectdFile);
    fileReader.onload = (event) => {
      let binaryData = event.target?.result;
      let workbook = XLSX.read(binaryData, { type: 'binary' });
      workbook.SheetNames.forEach(sheet => {
        try {
          const data: Productos[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        } catch (error) {
          console.log('errro');
        }
        const data: Productos[] = XLSX.utils.sheet_to_json(workbook.Sheets[sheet]);
        this.productosService.createProducto(data).subscribe(data => {
          console.log(data);
        });
      })
    }
  }

}
