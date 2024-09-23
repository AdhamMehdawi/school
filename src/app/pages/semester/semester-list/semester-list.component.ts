import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SemesterModel } from '../../../Models/SemesterModel';
import { SemesterDataService } from '../../../services/semester-data.service';

@Component({
  selector: 'app-semester-list',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './semester-list.component.html',
  styleUrl: './semester-list.component.css'
})
export class SemesterListComponent {
  semesters: SemesterModel[] = [];
  title = 'Semester List';
  constructor(private router: Router, private semesterDataService: SemesterDataService) {}

  ngOnInit(): void {
    this.semesterDataService.dataSource.subscribe((data) => {
      this.semesters = data;
    });
  }

  navigateTo(route: string, id?: number): void {
    if (id !== undefined) {
      this.router.navigate([`/${route}`, id]);
    } else {
      this.router.navigate([`/${route}`]);
    }
  }

  deleteSemester(semester: SemesterModel): void {
    this.semesterDataService.deleteSemester(semester);
  }
}