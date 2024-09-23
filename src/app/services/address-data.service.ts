import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddressModel } from '../Models/addressModel';

@Injectable({
  providedIn: 'root',
})
export class AddressDataService {
  private sourceAddressModel: AddressModel[] = [];
  public addresses: BehaviorSubject<AddressModel[]> = new BehaviorSubject<AddressModel[]>([]);
  dataSource = this.addresses.asObservable();

  constructor() {
    this.addresses.next(this.sourceAddressModel);
  }

  addAddress(address: AddressModel) {
    this.sourceAddressModel.push(address);
    this.addresses.next([...this.sourceAddressModel]);
  }

  getAddressesByStudentId(studentId: number): AddressModel[] {
    return this.sourceAddressModel.filter((address) => address.studentId === studentId);
  }

  updateAddress(address: AddressModel) {
    const index = this.sourceAddressModel.findIndex((a) => a.id === address.id);
    if (index !== -1) {
      this.sourceAddressModel[index] = address;
      this.addresses.next(this.sourceAddressModel);
    }
  }

  deleteAddress(id: number) {
    this.sourceAddressModel = this.sourceAddressModel.filter((address) => address.id !== id);
    this.addresses.next(this.sourceAddressModel);
  }

  getNextId(): number {
    return this.sourceAddressModel.length > 0
      ? Math.max(...this.sourceAddressModel.map((a) => a.id)) + 1
      : 1;
  }
}
