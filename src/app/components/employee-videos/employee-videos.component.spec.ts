import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeVideosComponent } from './employee-videos.component';

describe('EmployeeVideosComponent', () => {
  let component: EmployeeVideosComponent;
  let fixture: ComponentFixture<EmployeeVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployeeVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
