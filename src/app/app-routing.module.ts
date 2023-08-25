import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component'; 
import { WarehouseComponent } from './warehouse/warehouses.component';

const routes: Routes = [
  {path: 'product' ,component: ProductComponent},
  {path: 'warehouse' ,component: WarehouseComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
