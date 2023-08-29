import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../product.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { Product } from '../product';

@Component({
  selector: 'product-form',
  templateUrl: './productForm.component.html',
  styleUrls: ['./productForm.component.css']
})
export class ProductFormComponent implements OnInit,OnChanges {

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedProduct: any = null;
  @Input() warehousesFromParent: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Add";
  productForm = this.fb.group({
    name: ["", Validators.required],
    price: [0, Validators.required],
    description: [""],
    quantity: [0, Validators.required],
    warehouseId:[0],
  });
  warehouseForm = this.fb.group({
    id: [0, Validators.required],
    
  });
  warehouseListForm = this.fb.group({
    location: ["", Validators.required],
    
  });
  
  constructor(private fb: FormBuilder, private productService: ProductService,
    private messageService: MessageService, private _router: Router) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.selectedProduct) {
      this.modalType = 'Edit';
      this.productForm.patchValue(this.selectedProduct);
      this.warehouseForm.patchValue(this.selectedProduct.warehouseId);
    } else {
      console.log("On Changes of Add");
      console.log(this.warehousesFromParent);
      // this.warehousesFromParent = this.warehousesFromParent.map((warehouseObj: any) => {
      //   return {
      //     displayLabel: warehouseObj.id + ' - ' + warehouseObj.location + ' - ' + warehouseObj.capacity
      //   };
      // });
      this.productForm.reset();
      this.warehouseForm.reset();
      this.modalType = 'Add';
    }
  }
  closeModal() {
    this.productForm.reset();
    this.warehouseForm.reset();
    this.clickClose.emit(true);
  }

  onWareHouseSelection(wrh:any){
    console.log(wrh.data.capacity);
    
    if(this.selectedProduct){
      this.selectedProduct.warehouseId.id =wrh.data.id;
    }else{
     
      this.productForm.value.warehouseId = wrh.data.id;
  
    }
  }

  public isAdd(){
    let value = this.modalType === 'Add';
    return value;
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
