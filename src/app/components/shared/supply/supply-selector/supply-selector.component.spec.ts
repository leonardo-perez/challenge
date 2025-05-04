import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplySelectorComponent } from './supply-selector.component';
import { CommonModule } from '@angular/common';
import { SupplyComponent } from '../supply/supply.component';
import { SupplySearchComponent } from '../supply-search/supply-search.component';
import { SupplyPopupConfirmDeleteComponent } from '../supply-popup-confirm-delete/supply-popup-confirm-delete.component';
import { Supply } from '../../../../models/supply.model';
import { SupplyDataService } from '../../../../services/supply-data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SupplySelectorComponent', () => {
  let component: SupplySelectorComponent;
  let fixture: ComponentFixture<SupplySelectorComponent>;
  let supplyDataService: SupplyDataService;

  const mockSupplies: Supply[] = [
    {
      id: 1,
      address: 'Calle Principal 123',
      nis: '123456789',
      location: 'Rosario',
      tags: ['hogar'],
      alias: 'Casa Principal',
      disabled: false
    },
    {
      id: 2,
      address: 'Avenida Secundaria 456',
      nis: '987654321',
      location: 'Buenos Aires',
      tags: ['comercial'],
      alias: 'Oficina',
      disabled: false
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SupplySelectorComponent,
        CommonModule,
        SupplyComponent,
        SupplySearchComponent,
        SupplyPopupConfirmDeleteComponent,
        HttpClientTestingModule
      ],
      providers: [SupplyDataService]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplySelectorComponent);
    component = fixture.componentInstance;
    supplyDataService = TestBed.inject(SupplyDataService);
    component.supplies = mockSupplies;
    fixture.detectChanges();
  });

  it('crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('seleccionar un suministro diferente', () => {
    component.selectSupply(mockSupplies[1]);
    expect(component.supplySelected).toEqual(mockSupplies[1]);
  });

  it('filtrar suministros excluyendo el seleccionado', () => {
    component.selectSupply(mockSupplies[0]);
    const filteredSupplies = component.supplySelectedFiltered;
    expect(filteredSupplies.length).toBe(1);
    expect(filteredSupplies[0]).toEqual(mockSupplies[1]);
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

  it('eliminar suministro al confirmar', () => {
    const spy = jest.spyOn(supplyDataService, 'deleteSupply');
    component.confimrDelete(true);
    expect(spy).toHaveBeenCalledWith(component.supplySelected.id);
  });

  it('no eliminar suministro al cancelar', () => {
    const spy = jest.spyOn(supplyDataService, 'deleteSupply');
    component.confimrDelete(false);
    expect(spy).not.toHaveBeenCalled();
  });

  it('ocultar lista de opciones al hacer clic fuera del menú', () => {
    component.showListOptions = true;
    const event = new MouseEvent('click');
    component.onDocumentClick(event);
    expect(component.showListOptions).toBe(false);
  });
});
