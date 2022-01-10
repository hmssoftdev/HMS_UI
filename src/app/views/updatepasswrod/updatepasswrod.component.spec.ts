import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatepasswrodComponent } from './updatepasswrod.component';

describe('UpdatepasswrodComponent', () => {
  let component: UpdatepasswrodComponent;
  let fixture: ComponentFixture<UpdatepasswrodComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatepasswrodComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatepasswrodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
