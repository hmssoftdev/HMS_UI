import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopdataComponent } from './topdata.component';

describe('TopdataComponent', () => {
  let component: TopdataComponent;
  let fixture: ComponentFixture<TopdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
