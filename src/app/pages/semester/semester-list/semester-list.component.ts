import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SemesterDataService, SemesterModel } from '../../../services/semester-data.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
const ELEMENT_DATA: SemesterModel[] = [];
@Component({
  selector: 'app-semester-list',
  templateUrl: './semester-list.component.html',
  styleUrls: ['./semester-list.component.css'],
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule],
})



export class SemesterListComponent implements OnInit {
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['id', 'name', 'startDate', 'endDate'];
  semesters: SemesterModel[] = [];
  title: string = 'Semester List';
  input!: string;
  constructor(private router: Router, private semesterDataService: SemesterDataService) { }

  ngOnInit(): void {
    this.semesterDataService.dataSource.subscribe((data) => {
      this.semesters = data;
      this.dataSource = this.semesters;
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

  search(): void {
    this.semesterDataService.search(this.input);
  }
}
