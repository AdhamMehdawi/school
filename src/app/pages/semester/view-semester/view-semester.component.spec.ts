import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSemesterComponent } from './view-semester.component';

describe('ViewSemesterComponent', () => {
  let component: ViewSemesterComponent;
  let fixture: ComponentFixture<ViewSemesterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSemesterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSemesterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
