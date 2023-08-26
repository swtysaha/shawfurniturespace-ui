import { Component, OnInit } from '@angular/core';
import { Product } from './product';
import { ProductService } from './product.service';
import { Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  products: Product[] = [];
  displayAddModal = false;
  constructor(private productService: ProductService,private confirmationService: ConfirmationService,private messageService: MessageService,private router: Router) { }

  ngOnInit(): void {
    this.getProductList();
  }

  getProductList() {
    this.productService.getProducts().subscribe(
      response => {
        this.products = response;
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
    this.products.unshift(newData);
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
