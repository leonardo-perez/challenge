import { TestBed } from '@angular/core/testing';
import { SupplyDataService } from './supply-data.service';
import { HttpClient } from '@angular/common/http';
import { Supply } from '../models/supply.model';
import { of } from 'rxjs';

describe('SupplyDataService', () => {
  let service: SupplyDataService;
  let httpClient: HttpClient;

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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        SupplyDataService,
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn()
          }
        }
      ]
    });

    service = TestBed.inject(SupplyDataService);
    httpClient = TestBed.inject(HttpClient);
  });

  it('crear el componente', () => {
    expect(service).toBeTruthy();
  });

  it('obtener suministros', () => {
    jest.spyOn(httpClient, 'get').mockReturnValue(of(mockSupplies));
    
    service.getSupplyData().subscribe(response => {
      expect(response).toEqual(mockSupplies);
    });
    
    expect(httpClient.get).toHaveBeenCalledWith('assets/data/dataSupply.json');
  });


  it('eliminar un suministro', () => {// Primero establecemos los datos iniciales
    service.setSupplyData(mockSupplies);
    service.deleteSupply(1);
    
    service.dataSupplies$.subscribe(data => {
      expect(data.length).toBe(1);
      expect(data[0].id).toBe(2);
    });
  });

  it('mantener los datos actualizados en el BehaviorSubject', () => {
    const newSupplies: Supply[] = [...mockSupplies, {
      id: 3,
      address: 'Calle Falsa 123',
      nis: '456789123',
      location: 'Córdoba',
      tags: ['nuevo'],
      alias: 'Nueva Casa',
      disabled: false
    }];

    service.setSupplyData(mockSupplies);
    service.setSupplyData(newSupplies);

    service.dataSupplies$.subscribe(data => {
      expect(data).toEqual(newSupplies);
    });
  });
}); 