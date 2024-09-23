import { Component, Input, OnInit } from '@angular/core';
import { CourseModel } from '../../../Models/courseModel';
import { CourseDataService } from '../../../services/course-data.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-course',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css'],
})
export class CourseComponent implements OnInit {
  title: string = 'Course List';
  @Input() courses: CourseModel[] = [];

  constructor(
    public courseDataService: CourseDataService,
    private router: Router
  ) { }

  ngOnInit() {
    this.courseDataService.courses.subscribe((c) => {
      this.courses = c;
    });
  }

  navigateTo(route: string, id?: number) {
    if (id !== undefined) {
      this.router.navigate([`/${route}`, id]);
    } else {
      this.router.navigate([`/${route}`]);
    }
  }

  deleteCourse(id: number) {
    this.courseDataService.deleteCourse(id);
  }

  delete(CourseModel: CourseModel) {
    console.log(CourseModel);
  }

}
