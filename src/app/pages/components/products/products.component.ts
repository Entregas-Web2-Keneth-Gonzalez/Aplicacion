import { Component } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import Productos from '../../../Models/Producto';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';

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

  crear(){

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
