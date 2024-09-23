import { Injectable } from '@angular/core';
import { SemesterModel } from '../Models/SemesterModel';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SemesterDataService {
  public sourceSemesterModel: SemesterModel[] = [
    { id: 1, name: 'Fall 2023', startDate: '2023-09-01', endDate: '2023-12-15' },
    { id: 2, name: 'Spring 2024', startDate: '2024-01-15', endDate: '2024-05-30' },
  ];

  public semesters: BehaviorSubject<SemesterModel[]> = new BehaviorSubject<SemesterModel[]>([]);
  dataSource = this.semesters.asObservable();

  constructor() {
    this.semesters.next(this.sourceSemesterModel);
  }

  addSemester(semester: SemesterModel) {
    this.sourceSemesterModel.push(semester);
    this.semesters.next(this.sourceSemesterModel);
  }

  deleteSemester(semester: SemesterModel) {
    this.sourceSemesterModel.splice(this.sourceSemesterModel.indexOf(semester), 1);
    this.semesters.next(this.sourceSemesterModel);
  }

  updateSemester(semester: SemesterModel) {
    const index = this.sourceSemesterModel.findIndex((s) => s.id === semester.id);
    if (index !== -1) {
      this.sourceSemesterModel[index] = semester;
      this.semesters.next(this.sourceSemesterModel);
    }
  }
}