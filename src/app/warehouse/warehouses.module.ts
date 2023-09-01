import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { WarehouseComponent } from './warehouses.component';
import { ConfirmationService, MessageService } from 'primeng/api';
import { WarehouseFormModule } from '../product/warehouseForm/warehouseForm.module';

@NgModule({
  declarations: [
    WarehouseComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ButtonModule,
    ToolbarModule,
    ConfirmDialogModule,
    WarehouseFormModule,
    ToastModule
  ],
  exports: [
    WarehouseComponent
  ],
  providers: [MessageService,ConfirmationService]
})
export class WarehouseModule { }
