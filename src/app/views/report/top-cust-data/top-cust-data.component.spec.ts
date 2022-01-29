import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopCustDataComponent } from './top-cust-data.component';

describe('TopCustDataComponent', () => {
  let component: TopCustDataComponent;
  let fixture: ComponentFixture<TopCustDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopCustDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopCustDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
