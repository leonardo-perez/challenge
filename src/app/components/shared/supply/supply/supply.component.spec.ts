import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SupplyComponent } from './supply.component';
import { CommonModule } from '@angular/common';
import { Supply } from '../../../../models/supply.model';

describe('SupplyComponent', () => {
  let component: SupplyComponent;
  let fixture: ComponentFixture<SupplyComponent>;

  const mockSupply: Supply = {
    id: 1,
    address: 'Calle Principal 123',
    nis: '123456789',
    location: 'Ciudad A',
    tags: ['hogar', 'principal'],
    alias: 'Casa Principal',
    disabled: false
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplyComponent, CommonModule]
    }).compileComponents();

    fixture = TestBed.createComponent(SupplyComponent);
    component = fixture.componentInstance;
    component.supply = mockSupply;
    fixture.detectChanges();
  });

  it('crear el componente', () => {
    expect(component).toBeTruthy();
  });

});
