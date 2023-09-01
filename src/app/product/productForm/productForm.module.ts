import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { ProductFormComponent } from './productForm.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import {DialogModule, Dialog} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms'; 
import { InputNumberModule } from 'primeng/inputnumber';
import { ListboxModule } from 'primeng/listbox';
import { TableModule } from 'primeng/table';

@NgModule({
  declarations: [
    ProductFormComponent
  ],
  imports: [
   
    CommonModule,
    DialogModule,
    BrowserAnimationsModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule,
    ListboxModule,
    TableModule
      
  ],
  exports: [
    ProductFormComponent
  ]
})
export class ProductFormModule { }
