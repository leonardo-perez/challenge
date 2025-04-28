import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplySearchComponent } from './supply-search.component';

describe('SupplySearchComponent', () => {
  let component: SupplySearchComponent;
  let fixture: ComponentFixture<SupplySearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SupplySearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SupplySearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
