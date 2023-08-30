import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { WarehouseService } from 'src/app/warehouse/warehouses.service';


@Component({
  selector: 'warehouse-form',
  templateUrl: './warehouseForm.component.html',
  styleUrls: ['./warehouseForm.component.css']
})
export class WarehouseFormComponent implements OnInit ,OnChanges{

  @Input() displayAddEditModal: boolean = true;
  @Input() selectedWarehouse: any = null;
  @Output() clickClose: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output() clickAddEdit: EventEmitter<any> = new EventEmitter<any>();
  modalType = "Add";
  warehouseForm = this.fb.group({
    location: ["", Validators.required],
    capacity: [0, Validators.required],
    availableSpace: [0, Validators.required],
   });
  constructor(private fb: FormBuilder, private warehouseService: WarehouseService,
    private messageService: MessageService, private _router: Router) { }

  ngOnInit(): void {
  }

  ngOnChanges(): void {
    if (this.selectedWarehouse) {
      this.modalType = 'Edit';
      this.warehouseForm.patchValue(this.selectedWarehouse);
    } else {
      this.warehouseForm.reset();
      this.modalType = 'Add';
    }
  }

  public isAdd(){
    let value = this.modalType === 'Add';
    return value;
  }
  
  closeModal() {
    this.warehouseForm.reset();
    this.clickClose.emit(true);
  }

  addEditWarehouse() {
    this.warehouseService.saveWarehouse(this.warehouseForm.value, this.selectedWarehouse).subscribe(
      response => {
        console.log(response);
        this.clickAddEdit.emit(response);
        this.closeModal();
        const msg = this.modalType === 'Add' ? 'Warehouse added' : 'Warehouse updated';
        this.messageService.add({ severity: 'success', summary: 'Success', detail: msg });
      },
      error => {
        console.log(error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error });
        console.log('Errror occured'+error.error);
      }
    )
  }
}