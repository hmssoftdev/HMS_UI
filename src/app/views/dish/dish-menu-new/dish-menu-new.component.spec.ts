import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DishMenuNewComponent } from './dish-menu-new.component';

describe('DishMenuNewComponent', () => {
  let component: DishMenuNewComponent;
  let fixture: ComponentFixture<DishMenuNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DishMenuNewComponent ]
    })
    .compileComponents();
  });
  beforeEach(() => {
    fixture = TestBed.createComponent(DishMenuNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
