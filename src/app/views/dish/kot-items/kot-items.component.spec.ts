import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KOTItemsComponent } from './kot-items.component';

describe('KOTItemsComponent', () => {
  let component: KOTItemsComponent;
  let fixture: ComponentFixture<KOTItemsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KOTItemsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KOTItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
