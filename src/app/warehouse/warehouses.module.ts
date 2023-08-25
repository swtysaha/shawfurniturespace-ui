import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { TableModule } from 'primeng/table';

import { WarehouseComponent } from './warehouses.component';



@NgModule({
  declarations: [
    WarehouseComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule
  ],
  exports: [
    WarehouseComponent
  ]
})
export class WarehouseModule { }
