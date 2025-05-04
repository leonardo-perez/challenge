import { Component, Input, OnChanges, OnInit, SimpleChanges, HostListener, ElementRef, ViewChild } from '@angular/core';
import { Supply } from '../../../../models/supply.model';
import { CommonModule } from '@angular/common';
import { SupplyComponent } from '../supply/supply.component';
import { SupplySearchComponent } from '../supply-search/supply-search.component';
import { SupplyPopupConfirmDeleteComponent } from '../supply-popup-confirm-delete/supply-popup-confirm-delete.component';
import { SupplyDataService } from '../../../../services/supply-data.service';
@Component({
  selector: 'app-supply-selector',
  standalone: true,
  imports: [CommonModule,SupplyComponent, SupplySearchComponent, SupplyPopupConfirmDeleteComponent],
  templateUrl: './supply-selector.component.html',
  styleUrl: './supply-selector.component.scss'
})
export class SupplySelectorComponent implements  OnChanges {
  @Input() supplies!: Supply[];
  suppliesLoaded : boolean = false
  supplySelected : Supply = {} as Supply
  showListSupply : boolean = false
  showListOptions : boolean = false
  showPopupDelete: boolean = false
  @ViewChild('containerOptionMenu') containerOptionMenu!: ElementRef;

  constructor(
    private supplyService: SupplyDataService,
    private elementRef: ElementRef
  ) {}

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const clickedInside = this.elementRef.nativeElement.querySelector('.container-option-menu')?.contains(event.target);
    if (!clickedInside) {
      this.showListOptions = false;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['supplies']){
      this.supplies = changes['supplies'].currentValue;
      if(this.supplies.length > 0){
        this.selectSupply(this.supplies[0])
      }
    }
  }
  
  selectSupply(supply: Supply){
    this.supplySelected = supply;
  }

  askToDelete(){
    this.showPopupDelete = true;
    this.showListOptions = false;
  }

  confimrDelete(ev: boolean){
    this.showPopupDelete = false;
    if(ev){
      this.supplyService.deleteSupply(this.supplySelected.id)
    }
    
  }

  get supplySelectedFiltered() : Supply[]{
    return this.supplies.filter(s => s.id != this.supplySelected.id)
  }
}
