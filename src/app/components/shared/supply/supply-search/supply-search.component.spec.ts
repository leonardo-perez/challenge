import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplySearchComponent } from './supply-search.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Supply } from '../../../../models/supply.model';
import { HighlightDirective } from '../../../../directives/highlight.directive';
import { SupplyComponent } from '../supply/supply.component';

describe('SupplySearchComponent', () => {
  let component: SupplySearchComponent;
  let fixture: ComponentFixture<SupplySearchComponent>;
  let formBuilder: FormBuilder;

  const mockSupplies: Supply[] = [
    {
      id: 1,
      alias: 'Casa Principal',
      address: 'Calle Principal 123',
      location: 'Rosario',
      nis: '123456789',
      tags: ['hogar'],
      disabled: false
    },
    {
      id: 2,
      alias: 'Oficina',
      address: 'Avenida Secundaria 456',
      location: 'Buenos Aires',
      nis: '987654321',
      tags: ['comercial'],
      disabled: false
    }
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SupplySearchComponent,
        ReactiveFormsModule,
        HighlightDirective,
        SupplyComponent
      ],
      providers: [FormBuilder]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplySearchComponent);
    component = fixture.componentInstance;
    formBuilder = TestBed.inject(FormBuilder);
    component.supplies = mockSupplies;
    fixture.detectChanges();
  });

  it('crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('inicializar con un array vacío de suministros filtrados', () => {
    expect(component.filteredSupplies).toEqual([]);
  });

  it('filtrar suministros por alias', () => {
    const searchTerm = 'Principal';
    component.searchForm.get('searchInput')?.setValue(searchTerm);
    expect(component.filteredSupplies.length).toBe(1);
    expect(component.filteredSupplies[0].alias).toBe('Casa Principal');
  });

  it('filtrar suministros por dirección', () => {
    const searchTerm = 'Avenida';
    component.searchForm.get('searchInput')?.setValue(searchTerm);
    expect(component.filteredSupplies.length).toBe(1);
    expect(component.filteredSupplies[0].address).toBe('Avenida Secundaria 456');
  });

  it('filtrar suministros por NIS', () => {
    const searchTerm = '123456789';
    component.searchForm.get('searchInput')?.setValue(searchTerm);
    expect(component.filteredSupplies.length).toBe(1);
    expect(component.filteredSupplies[0].nis).toBe('123456789');
  });

  it('filtrar suministros por ubicación', () => {
    const searchTerm = 'Rosario';
    component.searchForm.get('searchInput')?.setValue(searchTerm);
    expect(component.filteredSupplies.length).toBe(1);
    expect(component.filteredSupplies[0].location).toBe('Rosario');
  });

  it('devolver un listado vacío cuando el filtro de búsqueda está vacío', () => {
    component.searchForm.get('searchInput')?.setValue('');
    expect(component.filteredSupplies).toEqual([]);
  });

  it('limpiar la busqueda y los resultados', () => {
    component.searchForm.get('searchInput')?.setValue('Principal');
    component.clearSearch();
    expect(component.searchForm.get('searchInput')?.value).toBe('');
    expect(component.filteredSupplies).toEqual([]);
    expect(component.currentSearchTerm).toBe('');
  });

  it('emitir evento al seleccionar un suministro', () => {
    const spy = jest.spyOn(component.selectSupply, 'emit');
    const supplyToSelect = mockSupplies[0];
    component.select(supplyToSelect);
    expect(spy).toHaveBeenCalledWith(supplyToSelect);
  });

  it('cancelar la suscripción en el onDestroy', () => {
    const subscription = (component as any).subscription;
    const spy = jest.spyOn(subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
