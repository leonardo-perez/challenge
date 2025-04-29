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

  it('crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('emitir evento de confirmacion del popup', () => {
    const spy = jest.spyOn(component.confirmDelete, 'emit');
    component.confirm(true);
    expect(spy).toHaveBeenCalledWith(true);
  });

  it('emitir evento de cancelacion del popup', () => {
    const spy = jest.spyOn(component.confirmDelete, 'emit');
    component.confirm(false);
    expect(spy).toHaveBeenCalledWith(false);
  });
});
