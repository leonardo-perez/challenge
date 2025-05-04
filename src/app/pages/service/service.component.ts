import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../components/shared/core/toolbar/toolbar.component';
import { Supply } from '../../models/supply.model';
import { SupplySelectorComponent } from '../../components/shared/supply/supply-selector/supply-selector.component';
import { SupplyDataService } from '../../services/supply-data.service';
@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  standalone: true,
  imports: [CommonModule, ToolbarComponent, SupplySelectorComponent]
})
export class ServiceComponent implements OnInit {
  Supplies? : Supply[] | null = null
  suppliesLoaded : boolean = false
  constructor(
    private supplyDataService : SupplyDataService
  ){}

  ngOnInit(): void {
    this.supplyDataService.dataSupplies$.subscribe((response : Supply[])=>{
      this.Supplies = response
    })
    this.getDataSupply()
  }

  getDataSupply(){
    this.supplyDataService.getSupplyData().subscribe((response : Supply[])=>{
      this.suppliesLoaded = true
    })
  }
}
