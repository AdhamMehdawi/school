import { ClassRomeModel } from './../Models/ClassRomeModel';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AddressModel } from '../Models/addressModel';

@Injectable({
  providedIn: 'root',
})
export class AddressDataService {
  private sourceAddressModel: AddressModel[] = [];
  private ClassRomeModel: ClassRomeModel[] = [];
  public addresses: BehaviorSubject<AddressModel[]> = new BehaviorSubject<AddressModel[]>([]);
  public classRoms: BehaviorSubject<ClassRomeModel[]> = new BehaviorSubject<ClassRomeModel[]>([]);
  //dataSource = this.addresses.asObservable();
  //dataSourceClassRoms = this.classRoms.asObservable();

  constructor() {
    this.addresses.next(this.sourceAddressModel);
    this.classRoms.next(this.ClassRomeModel);
  }

  addAddress(address: AddressModel) {
    this.sourceAddressModel.push(address);
    this.addresses.next([...this.sourceAddressModel]);
  }

  addClassRome(ClassRome: ClassRomeModel) {
    this.ClassRomeModel.push(ClassRome);
    this.classRoms.next([...this.ClassRomeModel]);
  }

  getAddressesByStudentId(studentId: number): AddressModel[] {
    return this.sourceAddressModel.filter((address) => address.studentId === studentId);
  }

  getClassBycurseId(curseid: number): ClassRomeModel[] {
    return this.ClassRomeModel.filter((cla) => cla.CurseId === curseid);
  }


  updateAddress(address: AddressModel) {
    const index = this.sourceAddressModel.findIndex((a) => a.id === address.id);
    if (index !== -1) {
      this.sourceAddressModel[index] = address;
      this.addresses.next(this.sourceAddressModel);
    }
  }

  updateClassRome(ClassRome: ClassRomeModel) {
    const index = this.ClassRomeModel.findIndex((a) => a.id === ClassRome.id);
    if (index !== -1) {
      this.ClassRomeModel[index] = ClassRome;
      this.classRoms.next(this.ClassRomeModel);
    }
  }

  deleteAddress(id: number) {
    this.sourceAddressModel = this.sourceAddressModel.filter((address) => address.id !== id);
    this.addresses.next(this.sourceAddressModel);
  }

  deleteClassRome(id: number) {
    this.ClassRomeModel = this.ClassRomeModel.filter((ClassRome) => ClassRome.id !== id);
    this.classRoms.next(this.ClassRomeModel);
  }

  getNextId(): number {
    return this.sourceAddressModel.length > 0
      ? Math.max(...this.sourceAddressModel.map((a) => a.id)) + 1
      : 1;
  }

  getNextClassRomeId(): number {
    return this.ClassRomeModel.length > 0
      ? Math.max(...this.ClassRomeModel.map((a) => a.id)) + 1
      : 1;
  }
}
