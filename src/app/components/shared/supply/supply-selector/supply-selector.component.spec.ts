import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplySelectorComponent } from './supply-selector.component';
import { CommonModule } from '@angular/common';
import { SupplyComponent } from '../supply/supply.component';
import { SupplySearchComponent } from '../supply-search/supply-search.component';
import { SupplyPopupConfirmDeleteComponent } from '../supply-popup-confirm-delete/supply-popup-confirm-delete.component';
import { Account } from '../../../../models/supplies.model';

describe('SupplySelectorComponent', () => {
  let component: SupplySelectorComponent;
  let fixture: ComponentFixture<SupplySelectorComponent>;

  const mockAccount: Account = {
    id: 1,
    address: 'Calle Principal 123',
    nis: 123456789,
    alias: 'Casa Principal',
    tags: ['hogar'],
    supplies: []
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SupplySelectorComponent,
        CommonModule,
        SupplyComponent,
        SupplySearchComponent,
        SupplyPopupConfirmDeleteComponent
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplySelectorComponent);
    component = fixture.componentInstance;
    component.account = mockAccount;
    fixture.detectChanges();
  });

  it('crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('mostrar popup de eliminación y ocultar lista de opciones', () => {
    component.askToDelete();
    expect(component.showPopupDelete).toBe(true);
    expect(component.showListOptions).toBe(false);
  });

  it('ocultar popup de eliminación al confirmar', () => {
    component.showPopupDelete = true;
    component.confimrDelete(true);
    expect(component.showPopupDelete).toBe(false);
  });

  it('ocultar popup de eliminación al cancelar', () => {
    component.showPopupDelete = true;
    component.confimrDelete(false);
    expect(component.showPopupDelete).toBe(false);
  });
});
