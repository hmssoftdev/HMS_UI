import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackdataComponent } from './backdata.component';

describe('BackdataComponent', () => {
  let component: BackdataComponent;
  let fixture: ComponentFixture<BackdataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackdataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackdataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
