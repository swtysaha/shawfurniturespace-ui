import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'product-form',
  templateUrl: './productForm.component.html',
  styleUrls: ['./productForm.component.css']
})
export class ProductFormComponent implements OnInit,OnChanges {

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedProduct: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Add";
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

  ngOnChanges(): void {
    if (this.selectedProduct) {
      this.modalType = 'Edit';
      this.productForm.patchValue(this.selectedProduct);
    } else {
      this.productForm.reset();
      this.modalType = 'Add';
    }
  }
  closeModal() {
    this.productForm.reset();
    this.clickClose.emit(true);
  }

  addEditProduct() {
    this.productService.saveProduct(this.productForm.value, this.selectedProduct).subscribe(
      response => {
        this.clickAddEdit.emit(response);
        this.closeModal();
        const msg = this.modalType === 'Add' ? 'Product added' : 'Product updated';
        this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
      },
      error => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error });
        console.log('Errror occured');
      }
    )
  }

}