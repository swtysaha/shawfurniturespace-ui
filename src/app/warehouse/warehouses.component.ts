import { Component, OnInit } from '@angular/core';
import { Warehouses } from './warehouses';
import { WarehouseService } from './warehouses.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehouseComponent implements OnInit {

  warehouses: Warehouses[] = [];
  displayAddModal = false;
  constructor(private warehouseService: WarehouseService,private confirmationService: ConfirmationService,private messageService: MessageService,private router: Router) { }

  ngOnInit(): void {
    this.getWareHouseList();
  }

  getWareHouseList() {
    this.warehouseService.getWarehouses().subscribe(
      response => {
        this.warehouses = response;
      }
    )
  }

  showAddModal() {
    this.displayAddModal = true;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddModal = !isClosed;
  }
  saveProductToList(newData: any) {
    this.warehouses.unshift(newData);
  }

  editWarehouse(warehouse: Warehouses){
    
  }
 
  deleteWarehouse(warehouse: Warehouses) {
    console.log('In delete');
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this product?',
      accept: () => {
        //Actual logic to perform a confirmation
        this.warehouseService.deleteWarehouse(warehouse.id).subscribe(
          response => {
           // this.products = this.products.filter(data =>{console.log(data.productId); data.productId !== product.productId});
           
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
           // this.router.navigate(['product']);
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          }
        )
      }
    });
  }

}
