import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ClassRomeModel } from '../../Models/ClassRomeModel';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AddressDataService } from '../../services/address-data.service';

@Component({
  selector: 'app-add-class',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-class.component.html',
  styleUrl: './add-class.component.css'
})
export class AddClassComponent implements OnInit, OnDestroy {
  courseid!: number;
  form!: FormGroup;
  ClassRoms: ClassRomeModel[] = [];
  subscription!: Subscription;


  constructor(
    private route: ActivatedRoute,
    private addressService: AddressDataService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.courseid = +params['curseId'];
      this.loadClassRomes();
    });

    this.form = this.fb.group({
      clasRomeForm: this.fb.array([this.createClassRomeForm()]),
    });


  }

  get clasRomeForms(): FormArray {
    return this.form.get('clasRomeForm') as FormArray;
  }

  navigateTo(route: string, id?: number) {
    if (id !== undefined) {
      this.router.navigate([`/${route}`, id]);
    } else {
      this.router.navigate([`/${route}`]);
    }
  }

  createClassRomeForm(): FormGroup {
    return this.fb.group({
      Capacity: [''],
      Building: [''],
      Floor: [''],
      RoomNumber: [''],
      RoomSide: [''],
    });
  }

  addClassRoomForm() {
    this.clasRomeForms.push(this.createClassRomeForm());
  }

  loadClassRomes() {
    this.subscription = this.addressService.classRoms.subscribe((c) => {
      this.ClassRoms = c.filter((a) => a.CurseId === this.courseid);
    });
  }


  deleteAddressForm(i: number) {
    if (this.clasRomeForms.length > 1) {
      this.clasRomeForms.removeAt(i);
    }
  }
  addClasRome() {
    for (let i = 0; i < this.clasRomeForms.length; i++) {
      const clasRoomFormGroup = this.clasRomeForms.at(i) as FormGroup;
      if (clasRoomFormGroup.valid) {
        const newClasRoom: ClassRomeModel = {
          id: this.addressService.getNextId(),
          CurseId: this.courseid,
          ...clasRoomFormGroup.value,
        };
        this.addressService.addClassRome(newClasRoom);
      }
    }

    this.clasRomeForms.clear();
    this.clasRomeForms.push(this.createClassRomeForm());

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
