import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { WarehouseFormComponent } from './warehouseForm.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import {DialogModule, Dialog} from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { ReactiveFormsModule } from '@angular/forms'; 
import { InputNumberModule } from 'primeng/inputnumber';

@NgModule({
  declarations: [
    WarehouseFormComponent
  ],
  imports: [
   
    CommonModule,
    DialogModule,
    BrowserAnimationsModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    InputNumberModule
      
  ],
  exports: [
    WarehouseFormComponent
  ]
})
export class WarehouseFormModule { }
