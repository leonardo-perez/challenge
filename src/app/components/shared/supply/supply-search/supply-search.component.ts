import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SupplyComponent } from '../supply/supply.component';
import { Supply } from '../../../../models/supplies.model';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Subscription, debounceTime, distinctUntilChanged, map } from 'rxjs';
import { HighlightDirective } from '../../../../directives/highlight.directive';

@Component({
  selector: 'app-supply-search',
  standalone: true,
  imports: [SupplyComponent, ReactiveFormsModule, HighlightDirective],
  templateUrl: './supply-search.component.html',
  styleUrl: './supply-search.component.scss'
})
export class SupplySearchComponent implements OnInit, OnDestroy {
    @Input() supplies: Supply[] = [];
    searchForm: FormGroup;
    private subscription: Subscription = new Subscription();
    filteredSupplies: Supply[] = [];
    currentSearchTerm: string = '';

    constructor(private fb: FormBuilder) {
        this.searchForm = this.fb.group({
            searchInput: ['']
        });
    }

    ngOnInit() {
        this.subscription.add(
            this.searchForm.get('searchInput')?.valueChanges.pipe(
                map(value => {
                    this.currentSearchTerm = value;
                    return this.filterSupplies(value);
                })
            ).subscribe(filteredSupplies => {
                this.filteredSupplies = filteredSupplies;
            })
        );
    }

    private filterSupplies(searchTerm: string): Supply[] {
        if (!searchTerm) {
            return [];
        }

        const term = searchTerm.toLowerCase();
        return this.supplies.filter(supply => 
            supply.alias.toLowerCase().includes(term) ||
            supply.address.toLowerCase().includes(term) ||
            supply.location.toLowerCase().includes(term) ||
            supply.nis.toLowerCase().includes(term)
        );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }
}
