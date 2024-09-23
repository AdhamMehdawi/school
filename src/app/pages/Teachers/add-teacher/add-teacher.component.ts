import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { TeacherDataServiceService } from '../../../services/teacher-data.service';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-add-teacher',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, JsonPipe],
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css'],
})
export class AddTeacherComponent implements OnInit {
  teacherForm!: FormGroup;
  editMode = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public teacherDataServiceService: TeacherDataServiceService
  ) {}

  ngOnInit(): void {
    this.teacherForm = this.fb.group({
      id: [0, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
    });

    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.getTeacherById(Number(id));
      }
    });
  }

  getTeacherById(id: number) {
    const teacher = this.teacherDataServiceService.sourceTeacherModel.find(
      (t) => t.id === id
    );
    if (teacher) {
      this.teacherForm.patchValue({
        id: teacher.id,
        name: teacher.name,
      });
    }
  }

  Onsubmit() {
    if (this.editMode) {
      this.teacherDataServiceService.updateTeacher(this.teacherForm.value);
    } else {
      this.teacherDataServiceService.update(this.teacherForm.value);
    }
    this.router.navigate(['teacherList']);
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
