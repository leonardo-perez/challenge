import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyPopupConfirmDeleteComponent } from './supply-popup-confirm-delete.component';

describe('SupplyPopupConfirmDeleteComponent', () => {
  let component: SupplyPopupConfirmDeleteComponent;
  let fixture: ComponentFixture<SupplyPopupConfirmDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplyPopupConfirmDeleteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplyPopupConfirmDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
