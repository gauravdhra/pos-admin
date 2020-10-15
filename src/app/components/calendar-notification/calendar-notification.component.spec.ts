import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalendarNotificationComponent } from './calendar-notification.component';

describe('CalendarNotificationComponent', () => {
  let component: CalendarNotificationComponent;
  let fixture: ComponentFixture<CalendarNotificationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalendarNotificationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalendarNotificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
