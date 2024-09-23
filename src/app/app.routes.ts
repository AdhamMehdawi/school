import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { MainpageComponent } from './mainpage/mainpage.component';
import { CourseComponent } from './pages/course/course/course.component';
import { AddCourseComponent } from './pages/course/add-course/add-course.component';
import { AddTeacherComponent } from './pages/Teachers/add-teacher/add-teacher.component';
import { AddStudentComponent } from './pages/student/add-student/add-student.component';
import { StudentListComponent } from './pages/student/student-list/student-list.component';
import { TeacherListComponent } from './pages/Teachers/teachers/teachers.component';
import { TeachViewComponent } from './pages/Teachers/teach-view/teach-view.component';
import { CourseViewComponent } from './pages/course/course-view/course-view.component';
import { StudentViewComponent } from './pages/student/student-view/student-view.component';
import { SemesterListComponent } from './pages/semester-list/semester-list.component';
import { AddSemesterComponent } from './pages/add-semester/add-semester.component';

export const routes: Routes = [
  {
    path: 'teacher/:id',
    component: TeachViewComponent,
  },
  {
    path: 'course/:id',
    component: CourseViewComponent,
  },
  {
    path: 'student/:id',
    component: StudentViewComponent,
  },
  {
    path: '',
    component: MainpageComponent,
  },
  {
    path: 'studentlist',
    component: StudentListComponent,
  },
  {
    path: 'add-student',
    component: AddStudentComponent,
  },
  {
    path: 'edit-student/:id',
    component: AddStudentComponent,
  },
  {
    path: 'teacherList',
    component: TeacherListComponent,
  },
  { path: 'add-teacher', component: AddTeacherComponent },
  { path: 'edit-teacher/:id', component: AddTeacherComponent },

  {
    path: 'courseList',
    component: CourseComponent,
  },
  {
    path: 'add-course',
    component: AddCourseComponent,
  },
  {
    path: 'edit-course/:id',
    component: AddCourseComponent,
  },
  {
    path:'semester',
    component:SemesterListComponent
  },
  {
    path:'semester/add',
    component:AddSemesterComponent
  }
];
