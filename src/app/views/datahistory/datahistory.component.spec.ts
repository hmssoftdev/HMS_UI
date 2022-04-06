import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatahistoryComponent } from './datahistory.component';

describe('DatahistoryComponent', () => {
  let component: DatahistoryComponent;
  let fixture: ComponentFixture<DatahistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatahistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatahistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
