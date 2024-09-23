import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
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
  addressForm!: FormGroup;
  addresses: AddressModel[] = [];
  subscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private addressService: AddressDataService,
    private fb: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.studentId = +params['studentId'];
      this.loadAddresses();
    });

    this.addressForm = this.fb.group({
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

  loadAddresses() {
    this.subscription = this.addressService.addresses.subscribe((addressList) => {
      this.addresses = addressList.filter((address) => address.studentId === this.studentId);
    });
  }

  addAddress() {
    const newAddress: AddressModel = {
      id: this.addressService.getNextId(),
      studentId: this.studentId,
      ...this.addressForm.value,
    };

    this.addressService.addAddress(newAddress);

    this.addressForm.reset();
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
