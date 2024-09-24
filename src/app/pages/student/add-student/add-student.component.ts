import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { StudentdataService } from '../../../services/studentdata.service';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-add-student',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, MatInputModule],
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  studentForm!: FormGroup;
  editMode = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public studentService: StudentdataService
  ) {
    this.studentForm = this.fb.group({
      stId: [0, [Validators.required]],
      Name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required]],
    });

  }


  ngOnInit(): void {
    if (this.studentForm.valid) {
      console.log(this.studentForm.value);
    }
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.getStudentById(Number(id));
      }
    });
  }

  getStudentById(id: number) {
    const student = this.studentService.sourceStudentModel.find(
      (s) => s.stId === id
    );
    if (student) {
      this.studentForm.patchValue({
        stId: student.stId,
        Name: student.Name,
        email: student.email,
        phone: student.phone,
      });
    }
  }

  Onsubmit() {
    this.studentForm.markAllAsTouched();//make it all tuched to make sure all validation are checked
    if (!this.studentForm.invalid) {

      if (this.editMode) {
        this.studentService.updateStudent(this.studentForm.value);
      } else {
        this.studentService.update(this.studentForm.value);
      }
      this.router.navigate(['studentList']);
    }
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
