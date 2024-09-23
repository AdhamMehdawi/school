import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SemesterDataService } from '../../../services/semester-data.service';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-add-semester',
  templateUrl: './add-semester.component.html',
  styleUrls: ['./add-semester.component.css'],
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, JsonPipe],
})
export class AddSemesterComponent implements OnInit {
  semesterForm: FormGroup;
  editMode = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public semesterDataService: SemesterDataService
  ) {
    this.semesterForm = this.fb.group(
      {
        id: [0, [Validators.required]],
        name: ['', [Validators.required]],
        startDate: ['', [Validators.required]],
        endDate: ['', [Validators.required]],
      },
      {
        validators: this.dateValidator 
      }
    );
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.getSemesterById(Number(id));
      }
    });
  }

  dateValidator(form: AbstractControl): { [key: string]: boolean } | null {
    const startDate = form.get('startDate')?.value;
    const endDate = form.get('endDate')?.value;

    if (startDate && endDate && new Date(startDate) >= new Date(endDate)) {
      return { dateInvalid: true }; 
    }
    return null; 
  }

  getSemesterById(id: number) {
    const semester = this.semesterDataService.sourceSemesterModel.find((s) => s.id === id);
    if (semester) {
      this.semesterForm.patchValue({
        id: semester.id,
        name: semester.name,
        startDate: semester.startDate,
        endDate: semester.endDate,
      });
    }
  }

  onSubmit() {
    if (this.semesterForm.invalid) {
      return; 
    }

    if (this.editMode) {
      this.semesterDataService.updateSemester(this.semesterForm.value);
    } else {
      this.semesterDataService.addSemester(this.semesterForm.value);
    }
    this.router.navigate(['semesterList']);
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
