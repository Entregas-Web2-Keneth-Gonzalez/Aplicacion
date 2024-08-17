import {ChangeDetectionStrategy, Component, inject, model, signal} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle,} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input'
import Productos from '../../../../Models/Producto';
import { ProductsService } from '../../../../services/products.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-productos-crud',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, FormsModule, MatButtonModule, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose, ReactiveFormsModule, NgIf],
  templateUrl: './productos-crud.component.html',
  styleUrl: './productos-crud.component.scss'
})
export class ProductosCrudComponent {

  tittle = "Crear producto";
  accion = 1
  isRead = false;
  readonly dialogRef = inject(MatDialogRef<ProductosCrudComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);
  producto:Productos | undefined;
  myForm!: FormGroup;

  constructor(private fb: FormBuilder, private productosSrv: ProductsService) {
    this.myForm = this.fb.group({
      id: ['', Validators.required],
      nombre: ['', Validators.required],
      precio: ['', Validators.required],
      stock: ['', Validators.required],
      estado: [true, Validators.required],
      categoria: ['', Validators.required],

    })
  }

  ngOnInit(){
    this.producto = this.data?.producto;
    this.accion = this.data?.accion;
    this.isRead = this.accion==3;
    this.tittle = this.accion == 1? "Crear producto": this.accion == 2? "Modificar producto" : "Detalle"

    if(this.accion==2 || this.accion==3){
      this.myForm.patchValue({
        id: this.producto?.id,
        nombre: this.producto?.nombre,
        precio: this.producto?.precio,
        stock: this.producto?.stock,
        estado: this.producto?.estado,
        categoria: this.producto?.categoria.id,
      }
      );
    }
  }

  onSubmit(){

    if(this.myForm.valid){
      this.productosSrv.create(this.myForm.value).subscribe((resp) => {
        alert("Se guardo correctamente");
      }, (err) => {
        alert("Error al guardar");
        console.error(err)
      })
    } 

  }

}
