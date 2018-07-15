import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';

import { ShippingAddress } from '@daffodil/core';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit {

  @Input() shippingInfo: ShippingAddress;
  @Output() updateShippingInfo: EventEmitter<any> = new EventEmitter();

  form: FormGroup
  state: AbstractControl;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.form = this.fb.group({
      'firstname': [this.shippingInfo ? this.shippingInfo.firstname : '', Validators.required],
      'lastname': [this.shippingInfo ? this.shippingInfo.lastname : '', Validators.required],
      'street': [this.shippingInfo ? this.shippingInfo.street : '', Validators.required],
      'city': [this.shippingInfo ? this.shippingInfo.city : '', Validators.required],
      'state': [this.shippingInfo ? this.shippingInfo.state : 'State', Validators.required],
      'postcode': [this.shippingInfo ? this.shippingInfo.postcode : '', Validators.required],
      'telephone': [this.shippingInfo ? this.shippingInfo.telephone : '', Validators.required]
    });

    this.state = this.form.controls['state'];
  }

  stateSelectValues = [
    'State',
    'California'
  ];

  onSubmit(form) {
    if(this.form.valid) {
      this.updateShippingInfo.emit(form.value);
    }
  }
}
