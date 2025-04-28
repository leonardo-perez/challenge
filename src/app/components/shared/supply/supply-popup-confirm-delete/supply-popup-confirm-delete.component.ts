import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-supply-popup-confirm-delete',
  standalone: true,
  imports: [],
  templateUrl: './supply-popup-confirm-delete.component.html',
  styleUrl: './supply-popup-confirm-delete.component.scss'
})
export class SupplyPopupConfirmDeleteComponent {
  @Output() confirmDelete = new EventEmitter<boolean>();
  
  confirm(state : boolean){
    this.confirmDelete.emit(state)
  }
}
