import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ServiceComponent } from './service.component';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from '../../components/shared/core/toolbar/toolbar.component';
import { SupplySelectorComponent } from '../../components/shared/supply/supply-selector/supply-selector.component';
import { SupplyDataService } from '../../services/supply-data.service';
import { of } from 'rxjs';
import { Account } from '../../models/supplies.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ServiceComponent', () => {
  let component: ServiceComponent;
  let fixture: ComponentFixture<ServiceComponent>;
  let supplyDataService: SupplyDataService;

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
    
    // Mock del método getSupplyData
    jest.spyOn(supplyDataService, 'getSupplyData').mockReturnValue(of(mockAccount));
    
    fixture.detectChanges();
  });

  it('crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('cargar datos de suministro', () => {
    component.ngOnInit();
    expect(supplyDataService.getSupplyData).toHaveBeenCalled();
    expect(component.accounts).toEqual(mockAccount);
  });

  it('actualizar accounts cuando se obtienen datos del servicio', () => {
    component.getDataSupply();
    expect(supplyDataService.getSupplyData).toHaveBeenCalled();
    expect(component.accounts).toEqual(mockAccount);
  });
});
