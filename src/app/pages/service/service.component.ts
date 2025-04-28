import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToolbarComponent } from '../../components/shared/core/toolbar/toolbar.component';
import { Account, Supply } from '../../models/supplies.model';
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
  accounts? : Account | null = null
  constructor(
    private supplyDataService : SupplyDataService
  ){}

  ngOnInit(): void {
    this.getDataSupply()
  }

  getDataSupply(){
    this.supplyDataService.getSupplyData().subscribe((response : Account)=>{
      this.accounts = response
    })
  }
}
