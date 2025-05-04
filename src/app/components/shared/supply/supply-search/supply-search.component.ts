import { Component, Input, OnInit, OnDestroy, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { SupplyComponent } from '../supply/supply.component';
import { Supply } from '../../../../models/supply.model';
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
export class SupplySearchComponent implements OnInit, OnDestroy, OnChanges {
    @Input() supplies: Supply[] = [];
    @Output() selectSupply: EventEmitter<Supply> = new EventEmitter<Supply>();
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

    ngOnChanges(changes: SimpleChanges): void {
        if(changes['supplies']){
            this.filteredSupplies = this.filterSupplies(this.currentSearchTerm);
        }
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

    select(supply: Supply){
        this.selectSupply.emit(supply);
        this.clearSearch();
    }
    
    clearSearch(){
        this.searchForm.get('searchInput')?.setValue('');
        this.currentSearchTerm = '';
        this.filteredSupplies = [];
    }
}
