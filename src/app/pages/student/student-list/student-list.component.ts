import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { StudnetModel } from '../../../Models/student.modle';
import { StudentdataService } from '../../../services/studentdata.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
const ELEMENT_DATA: StudnetModel[] = [];
@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, MatTableModule],
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.css'],
})
export class StudentListComponent implements OnInit, OnChanges, OnDestroy {
  dataSource = ELEMENT_DATA;
  displayedColumns: string[] = ['stId', 'Name', 'email', 'phone'];
  title: string = 'Student List';
  sudentSoucrReference: any;
  @Input() students: StudnetModel[] = [];
  test!: string;
  constructor(
    public studentservice: StudentdataService,
    private router: Router
  ) { }
  ngOnDestroy(): void {
    this.sudentSoucrReference.unsubscribe();
  }

  ngOnInit() {
    this.sudentSoucrReference = this.studentservice.students.subscribe((c) => {
      this.students = c;
    });
    this.dataSource = this.students;
  }

  navigateTo(route: string, id?: number) {
    if (id !== undefined) {
      this.router.navigate([`/${route}`, id]);
    } else {
      this.router.navigate([`/${route}`]);
    }
  }

  deleteStudent(id: number) {
    this.studentservice.deleteStudent(id);
  }

  ngOnChanges(changes: SimpleChanges): void {
    alert("hh");
  }

  search() {
    this.studentservice.search(this.test);
  }
}
