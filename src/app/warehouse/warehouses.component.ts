import { Component, OnInit } from '@angular/core';
import { Warehouses } from './warehouses';
import { WarehouseService } from './warehouses.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouses.component.html',
  styleUrls: ['./warehouses.component.css']
})
export class WarehouseComponent implements OnInit {
  displayAddEditModal = false;
  selectedWarehouse: any = null;
  subscriptions: Subscription[] = [];
  pdtSubscription: Subscription = new Subscription();
  warehouses: Warehouses[] = [];
  constructor(private warehouseService: WarehouseService, private confirmationService: ConfirmationService, private messageService: MessageService, private router: Router) { }

  ngOnInit(): void {
    this.getWareHouseList();
  }

  getWareHouseList() {
    this.pdtSubscription = this.warehouseService.getWarehouses().subscribe(
      response => {
        this.warehouses = response;
      }
    );
    this.subscriptions.push(this.pdtSubscription)
  }

  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedWarehouse = null;
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }
  saveorUpdateWarehouseList(newData: any) {
    if (this.selectedWarehouse && newData.id === this.selectedWarehouse.id) {
      const productIndex = this.warehouses.findIndex(data => data.id === newData.id);
      this.warehouses[productIndex] = newData;

    } else {
      this.warehouses.unshift(newData);
    }

    this.getWareHouseList();
  }

  showEditModal(warehouse: Warehouses) {
    this.displayAddEditModal = true;
    this.selectedWarehouse = warehouse;
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
            this.getWareHouseList();
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
          }
        )
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

}
