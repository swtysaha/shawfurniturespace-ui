import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'product-form',
  templateUrl: './productForm.component.html',
  styleUrls: ['./productForm.component.css']
})
export class ProductFormComponent implements OnInit {

  @Input() displayAddModal: boolean = true;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAdd: EventEmitter<any> = new EventEmitter<any>();

  productForm = this.fb.group({
    name: ["", Validators.required],
    price: [0, Validators.required],
    description: [""],
    quantity: [0, Validators.required],
    warehouseId: [0, Validators.required],

    
  });
  constructor(private fb: FormBuilder, private productService: ProductService,
    private messageService: MessageService, private _router: Router) { }

  ngOnInit(): void {
  }

  closeModal() {
    this.productForm.reset();
    this.clickClose.emit(true);
  }

  addProduct() {
    this.productService.saveProduct(this.productForm.value).subscribe(
      response => {
        this.clickAdd.emit(response);
        this.closeModal();
       // this._router.navigate(['product'])
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product added' });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
        console.log('Errror occured');
        console.log(error);
      }
    )
  }

}