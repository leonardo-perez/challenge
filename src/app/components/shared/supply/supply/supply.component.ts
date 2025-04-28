import { Component, Input } from '@angular/core';
import { Supply } from '../../../../models/supplies.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-supply',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './supply.component.html',
  styleUrl: './supply.component.scss'
})
export class SupplyComponent {
    @Input() supply!: Supply;
}
