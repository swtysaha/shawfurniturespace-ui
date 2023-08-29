import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { WarehouseService } from '../warehouse/warehouses.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Subscription } from 'rxjs';
import { Warehouses } from '../warehouse/warehouses';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit , OnDestroy{

  products: Product[] = [];
  displayAddEditModal = false;
  selectedProduct: any = null;
  subscriptions: Subscription[] = [];
  warehouses: Warehouses[] = [];
  pdtSubscription: Subscription = new Subscription();
  constructor(private warehouseService:WarehouseService,private productService: ProductService,private confirmationService: ConfirmationService,private messageService: MessageService,private router: Router) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.pdtSubscription = this.productService.getProducts().subscribe(
      response => {
        this.products = response;
      }
    );
    this.subscriptions.push(this.pdtSubscription)
  }
  showAddModal() {
    this.displayAddEditModal = true;
    this.selectedProduct = null;
    this.warehouseService.getWarehouses().subscribe(
      response => {
        this.warehouses = response;
      }
    );
  }

  hideAddModal(isClosed: boolean) {
    this.displayAddEditModal = !isClosed;
  }

  saveorUpdateProductList(newData: any) {
    if (this.selectedProduct && newData.id === this.selectedProduct.productId) {
      const productIndex = this.products.findIndex(data => data.productId === newData.productId);
      console.log(newData);
      this.products[productIndex] = newData;
      
    } else {
      this.products.unshift(newData);
    }

    this.getProductList();
  }

  showEditModal(product: Product) {
    this.displayAddEditModal = true;
    this.selectedProduct = product;
  }
   
  deleteProduct(product: Product) {
    console.log('In delete');
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this product?',
      accept: () => {
        //Actual logic to perform a confirmation
        this.productService.deleteProduct(product.productId).subscribe(
          response => {
           // this.products = this.products.filter(data =>{console.log(data.productId); data.productId !== product.productId});
           
            this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted Successfully' });
            this.getProductList();
          },
          error => {
            this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
          }
        )
      }
    });
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
