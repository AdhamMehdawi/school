import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SemesterDataService } from '../../../services/semester-data.service';
import { SemesterModel } from '../../../Models/SemesterModel';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-semester',
  standalone: true,
  templateUrl: './view-semester.component.html',
  styleUrls: ['./view-semester.component.css'],
  imports: [CommonModule],
})
export class ViewSemesterComponent implements OnInit {
  semesterId!: number;
  semester: SemesterModel = {
    id: 0,
    name: '',
    startDate: '',
    endDate: '',
  };

  constructor(
    private route: ActivatedRoute,
    private semesterDataService: SemesterDataService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.semesterId = Number(params.get('id'));
      this.getSemesterById(this.semesterId);
    });
  }

  getSemesterById(id: number): void {
    const allSemesters = this.semesterDataService.sourceSemesterModel;
    this.semester = allSemesters.find((s) => s.id === id) || ({} as SemesterModel);
  }
}
