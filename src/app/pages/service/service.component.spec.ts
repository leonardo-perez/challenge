import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceComponent } from './service.component';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../../components/shared/core/toolbar/toolbar.component';
import { SupplySelectorComponent } from '../../components/shared/supply/supply-selector/supply-selector.component';
import { SupplyDataService } from '../../services/supply-data.service';
import { of } from 'rxjs';
import { Supply } from '../../models/supply.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ServiceComponent', () => {
  let component: ServiceComponent;
  let fixture: ComponentFixture<ServiceComponent>;
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
        ServiceComponent,
        CommonModule,
        ToolbarComponent,
        SupplySelectorComponent,
        HttpClientTestingModule
      ],
      providers: [
        SupplyDataService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ServiceComponent);
    component = fixture.componentInstance;
    supplyDataService = TestBed.inject(SupplyDataService);
    
    jest.spyOn(supplyDataService, 'getSupplyData').mockReturnValue(of(mockSupplies));
    
    fixture.detectChanges();
  });

  it('crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('cargar datos de suministro al iniciar', () => {
    component.ngOnInit();
    expect(supplyDataService.getSupplyData).toHaveBeenCalled();
    expect(component.suppliesLoaded).toBeTruthy();
  });

  it('suscribirse a cambios en dataSupplies$', () => {
    const spy = jest.spyOn(supplyDataService.dataSupplies$, 'subscribe');
    component.ngOnInit();
    expect(spy).toHaveBeenCalled();
  });

  it('actualizar supplies cuando dataSupplies$ emite nuevos datos', () => {
    const newSupplies: Supply[] = [...mockSupplies, {
      id: 3,
      address: 'Calle Nueva 789',
      nis: '456789123',
      location: 'Córdoba',
      tags: ['nuevo'],
      alias: 'Nueva Casa',
      disabled: false
    }];
    
    supplyDataService.dataSupplies$.next(newSupplies);
    expect(component.Supplies).toEqual(newSupplies);
  });
});
