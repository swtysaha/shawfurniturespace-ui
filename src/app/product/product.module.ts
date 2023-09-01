import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import { ProductComponent } from './product.component';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { ButtonModule } from 'primeng/button';
import { ProductFormModule } from './productForm/productForm.module';
import { MessageService } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';
import { ConfirmDialogModule } from 'primeng/confirmdialog';


@NgModule({
  declarations: [
    ProductComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    TableModule,
    ToolbarModule,
    ProductFormModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule
  ],
  exports: [
    ProductComponent
  ],
  providers: [MessageService,ConfirmationService]
})
export class ProductModule { }
