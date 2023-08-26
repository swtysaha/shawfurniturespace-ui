import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component'; 
import { WarehouseComponent } from './warehouse/warehouses.component';
import { ProductFormComponent } from './product/productForm/productForm.component';

const routes: Routes = [
  {path: 'product' ,component: ProductComponent},
  {path: '' ,redirectTo:'/product' ,pathMatch: 'full'},
  {path: 'warehouse' ,component: WarehouseComponent},
  {path: 'productForm' ,component: ProductFormComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
