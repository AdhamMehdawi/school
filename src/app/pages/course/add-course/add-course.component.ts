import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CourseDataService } from '../../../services/course-data.service';
import { CommonModule, JsonPipe } from '@angular/common';

@Component({
  selector: 'app-add-course',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, JsonPipe],
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css'],
})
export class AddCourseComponent implements OnInit {
  courseForm: FormGroup;
  editMode = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    public courseDataService: CourseDataService
  ) {
    this.courseForm = this.fb.group({
      id: [0, [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.editMode = true;
        this.getCourseById(Number(id));
      }
    });
  }

  getCourseById(id: number) {
    const course = this.courseDataService.sourceCourseModel.find(
      (c) => c.id === id
    );
    if (course) {
      this.courseForm.patchValue({
        id: course.id,
        name: course.name,
        description: course.description,
      });
    }
  }

  Onsubmit() {
    if (this.editMode) {
      this.courseDataService.updateCourse(this.courseForm.value);
    } else {
      this.courseDataService.update(this.courseForm.value);
    }
    this.router.navigate(['courseList']);
  }

  navigateTo(route: string) {
    this.router.navigate([`/${route}`]);
  }
}
