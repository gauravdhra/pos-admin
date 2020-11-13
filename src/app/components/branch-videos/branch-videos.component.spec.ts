import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchVideosComponent } from './branch-videos.component';

describe('BranchVideosComponent', () => {
  let component: BranchVideosComponent;
  let fixture: ComponentFixture<BranchVideosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BranchVideosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchVideosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
