import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { UserData } from '../models/user.model';
import { of } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let httpClient: HttpClient;
  let router: Router;

  const mockUserData: UserData = {
    email: 'usuario@ejemplo.com',
    password: 'password123',
    name: 'Usuario Ejemplo',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  };

  const emptyUserData: UserData = {
    email: '',
    password: '',
    name: '',
    token: ''
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AuthService,
        {
          provide: HttpClient,
          useValue: {
            get: jest.fn()
          }
        },
        {
          provide: Router,
          useValue: {
            navigate: jest.fn()
          }
        }
      ]
    });

    service = TestBed.inject(AuthService);
    httpClient = TestBed.inject(HttpClient);
    router = TestBed.inject(Router);
  });

  it('crear el componente', () => {
    expect(service).toBeTruthy();
  });

  it('realizar login exitosamente', () => {
    jest.spyOn(httpClient, 'get').mockReturnValue(of(mockUserData));
    
    service.login('usuario@ejemplo.com', 'password123').subscribe(response => {
      expect(response).toEqual(mockUserData);
    });
    
    expect(httpClient.get).toHaveBeenCalledWith('assets/data/userData.json');
  });

  it('almacenar datos del usuario en localStorage', () => {
    const setItemSpy = jest.spyOn(Storage.prototype, 'setItem');
    
    service.setUser(mockUserData);
    
    expect(setItemSpy).toHaveBeenCalledWith('token', mockUserData.token);
    expect(setItemSpy).toHaveBeenCalledWith('currentUser', JSON.stringify(mockUserData));
  });

  it('obtener datos del usuario desde localStorage', () => {
    const getItemSpy = jest.spyOn(Storage.prototype, 'getItem').mockReturnValue(JSON.stringify(mockUserData));
    
    const userData = service.getUserData();
    
    expect(getItemSpy).toHaveBeenCalledWith('currentUser');
    expect(userData).toEqual(mockUserData);
  });

 
  it('realizar logout correctamente', () => {
    const removeItemSpy = jest.spyOn(Storage.prototype, 'removeItem');
    
    service.logout();
    
    expect(removeItemSpy).toHaveBeenCalledWith('token');
    expect(removeItemSpy).toHaveBeenCalledWith('currentUser');
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
}); 