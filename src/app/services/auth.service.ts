import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { UserData } from '../models/user.model';

interface LoginResponse {
    token: string;
    user: {
        id: number;
        email: string;
        name: string;
    };
}

interface User {
  email: string;
  password: string;
  name: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private usersUrl = 'assets/data/users.json';
      private userDataUrl = 'assets/data/userData.json';


    constructor(private http: HttpClient) {
       
    }

    login(email: string, password: string): Observable<UserData> {

        return this.http.get<UserData>(this.userDataUrl);
    }

    logout(): void {
        // Limpiar el localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
       
    }

    setUser(userData :UserData){
        localStorage.setItem('token', userData.token);
        localStorage.setItem('currentUser', JSON.stringify(userData));
    }

   

  
} 