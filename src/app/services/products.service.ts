import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import Productos from '../Models/Producto';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
 nombre="";
  constructor(private http: HttpClient) { }

  getProducts():Observable<Productos[]>{
   return this.http.get<Productos[]>("http://localhost:3000/productos");
  }
  getOne(){

  }
  create(producto: Productos): Observable<any>{
    return this.http.post<any>("http://localhost:3000/productos",producto);
  }
  update(producto: Productos){
    return this.http.put<any>(`http://localhost:3000/productos/${producto.id}`,producto);
  }
  delete(id:number):Observable<any>{
    return this.http.delete<any>(`http://localhost:3000/productos/${id}`)
  }


}
