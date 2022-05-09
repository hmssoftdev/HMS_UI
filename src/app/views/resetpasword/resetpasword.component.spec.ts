import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResetpaswordComponent } from './resetpasword.component';

describe('ResetpaswordComponent', () => {
  let component: ResetpaswordComponent;
  let fixture: ComponentFixture<ResetpaswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ResetpaswordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ResetpaswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
