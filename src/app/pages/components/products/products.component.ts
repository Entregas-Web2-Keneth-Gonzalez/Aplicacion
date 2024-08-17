import { Component, inject } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import Productos from '../../../Models/Producto';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { ProductosCrudComponent } from './productos-crud/productos-crud.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [MatButtonModule, MatIconModule, MatTableModule],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss'
})
export class ProductsComponent {

  displayedColumns: string[] = ['id', 'nombre', 'precio', 'categoria', 'acciones'];

  lista:Productos[]=[];
  readonly dialog = inject(MatDialog);

  constructor(private productosSrv:ProductsService){}


  ngOnInit(){

    this.cargarDatos();
  }

  cargarDatos(){
    this.productosSrv.getProducts().subscribe((datos)=>{

      this.lista = datos;
    })
  }

  // verDetalle(){
  //   alert('aqui en el detalle del producto...');
  // }

  openDialog(accion?:number, producto?: Productos){
    const dialogRef = this.dialog.open(ProductosCrudComponent, {
      height: '500px', width: '500px',
      data: {accion, producto},
    })
  }

  modificar(producto:Productos){
    alert(producto.nombre)

  }

  eliminar(id:number){
    this.productosSrv.delete(id).subscribe(() =>{
      alert("Se elimino correctamente");
      this.cargarDatos();
    });

  }

  detalle(producto:Productos){
    alert(producto.nombre)
  }
}
