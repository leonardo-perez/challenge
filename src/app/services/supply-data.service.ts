import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { Supply } from '../models/supply.model';
import { map, tap } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SupplyDataService {
    private supplyDataUrl = 'assets/data/dataSupply.json';
    private dataSupplies : Supply[] = [];
    public dataSupplies$ = new BehaviorSubject<Supply[]>([]);

    constructor(private http: HttpClient) { }

    getSupplyData(): Observable<Supply[]> {
        return this.http.get<Supply[]>(this.supplyDataUrl).pipe(
            tap(data => this.setSupplyData(data))
        );
    }

    setSupplyData(data: Supply[]): void {
        this.dataSupplies = data
        this.dataSupplies$.next(data);
    }

    deleteSupply(id: number): void {
        this.dataSupplies = this.dataSupplies.filter(supply => supply.id !== id);
        this.dataSupplies$.next(this.dataSupplies);
    }

} 