import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '../models/supplies.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})
export class SupplyDataService {
    private supplyDataUrl = 'assets/data/dataSupply.json';

    constructor(private http: HttpClient) { }

    getSupplyData(): Observable<Account> {
        return this.http.get<Account>(this.supplyDataUrl);
    }
} 