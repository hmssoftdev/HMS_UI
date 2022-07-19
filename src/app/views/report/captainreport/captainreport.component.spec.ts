import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaptainreportComponent } from './captainreport.component';

describe('CaptainreportComponent', () => {
  let component: CaptainreportComponent;
  let fixture: ComponentFixture<CaptainreportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CaptainreportComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CaptainreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
