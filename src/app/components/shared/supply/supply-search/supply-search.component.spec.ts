import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplySearchComponent } from './supply-search.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Supply } from '../../../../models/supplies.model';
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
      location: 'Ciudad A',
      nis: '123456789'
    },
    {
      id: 2,
      alias: 'Oficina',
      address: 'Avenida Secundaria 456',
      location: 'Ciudad B',
      nis: '987654321'
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

  it('crear el componente correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('inicializar con un array vacío de suministros filtrados', () => {
    expect(component.filteredSupplies).toEqual([]);
  });

  it('filtrar suministros por término de búsqueda', () => {
    const searchTerm = 'Principal';
    component.searchForm.get('searchInput')?.setValue(searchTerm);
    
    expect(component.filteredSupplies.length).toBe(1);
    expect(component.filteredSupplies[0].alias).toBe('Casa Principal');
  });

  it('filtrar suministros por NIS', () => {
    const searchTerm = '123456789';
    component.searchForm.get('searchInput')?.setValue(searchTerm);
    
    expect(component.filteredSupplies.length).toBe(1);
    expect(component.filteredSupplies[0].nis).toBe('123456789');
  });

  it('filtrar suministros por location', () => {
    const searchTerm = 'Ciudad A';
    component.searchForm.get('searchInput')?.setValue(searchTerm);
    
    expect(component.filteredSupplies.length).toBe(1);
    expect(component.filteredSupplies[0].location).toBe('Ciudad A');
  });

  it('devolver un listado vacío cuando el filtro de búsqueda está vacío', () => {
    component.searchForm.get('searchInput')?.setValue('');
    expect(component.filteredSupplies).toEqual([]);
  });


  it('cancelar la suscripción en el onDestroy', () => {
    const subscription = (component as any).subscription;
    const spy = jest.spyOn(subscription, 'unsubscribe');
    component.ngOnDestroy();
    expect(spy).toHaveBeenCalled();
  });
});
