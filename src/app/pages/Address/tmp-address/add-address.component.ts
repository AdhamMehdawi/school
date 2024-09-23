import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormArray,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AddressModel } from '../../../Models/addressModel';
import { AddressDataService } from '../../../services/address-data.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-add-address',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css'],
})
export class AddAddressComponent implements OnInit, OnDestroy {
  studentId!: number;
  form!: FormGroup;
  addresses: AddressModel[] = [];
  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private addressService: AddressDataService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.studentId = +params['studentId'];
      this.loadAddresses();
    });

    this.form = this.fb.group({
      addressForms: this.fb.array([this.createAddressForm()]),
    });
  }

  get addressForms(): FormArray {
    return this.form.get('addressForms') as FormArray;
  }

  createAddressForm(): FormGroup {
    return this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      neighborhood: [''],
      building: [''],
      floor: [''],
      apartment: [''],
      bedNumber: [''],
      bedSide: ['', Validators.required],
    });
  }

  addAddressForm() {
    this.addressForms.push(this.createAddressForm());
  }

  removeAddressForm(index: number) {
    if (this.addressForms.length > 1) {
      this.addressForms.removeAt(index);
    }
  }

  loadAddresses() {
    this.subscription = this.addressService.addresses.subscribe((addressList) => {
      this.addresses = addressList.filter(
        (address) => address.studentId === this.studentId
      );
    });
  }

  addAddresses() {
    for (let i = 0; i < this.addressForms.length; i++) {
      const addressFormGroup = this.addressForms.at(i) as FormGroup;
      if (addressFormGroup.valid) {
        const newAddress: AddressModel = {
          id: this.addressService.getNextId(),
          studentId: this.studentId,
          ...addressFormGroup.value,
        };
        this.addressService.addAddress(newAddress);
      }
    }
    // Reset the FormArray
    this.addressForms.clear();
    this.addressForms.push(this.createAddressForm());
  }

  navigateTo(route: string, id?: number) {
    if (id !== undefined) {
      this.router.navigate([`/${route}`, id]);
    } else {
      this.router.navigate([`/${route}`]);
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
