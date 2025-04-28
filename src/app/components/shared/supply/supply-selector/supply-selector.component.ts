import { Component, Input } from '@angular/core';
import { Account } from '../../../../models/supplies.model';
import { CommonModule } from '@angular/common';
import { SupplyComponent } from '../supply/supply.component';
import { SupplySearchComponent } from '../supply-search/supply-search.component';
import { SupplyPopupConfirmDeleteComponent } from '../supply-popup-confirm-delete/supply-popup-confirm-delete.component';

@Component({
  selector: 'app-supply-selector',
  standalone: true,
  imports: [CommonModule,SupplyComponent, SupplySearchComponent, SupplyPopupConfirmDeleteComponent],
  templateUrl: './supply-selector.component.html',
  styleUrl: './supply-selector.component.scss'
})
export class SupplySelectorComponent {
  @Input() account!: Account;
  showListSupply : boolean = false
  showListOptions : boolean = false
  showPopupDelete: boolean = false


  askToDelete(){
    this.showPopupDelete = true;
    this.showListOptions = false;
  }

  confimrDelete(ev: boolean){
    this.showPopupDelete = false;
  }
}
