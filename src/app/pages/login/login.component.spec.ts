import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UserData } from '../../models/user.model';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let router: Router;

  const mockUserData: UserData = {
    email: 'juan@example.com',
    password: 'password123',
    name: 'Juan Pérez',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikp1YW4gUGVyZXoiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        LoginComponent,
        ReactiveFormsModule,
        HttpClientTestingModule
      ],
      providers: [
        FormBuilder,
        {
          provide: Router,
          useValue: {
            navigate: jest.fn()
          }
        },
        AuthService
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('crear el componente', () => {
    expect(component).toBeTruthy();
  });


  it('mostrar error cuando el email es inválido', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('email-invalido');
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['email']).toBeTruthy();
  });

  it('mostrar error cuando el email está vacío', () => {
    const emailControl = component.loginForm.get('email');
    emailControl?.setValue('');
    expect(emailControl?.valid).toBeFalsy();
    expect(emailControl?.errors?.['required']).toBeTruthy();
  });

  it('mostrar error cuando la contraseña está vacía', () => {
    const passwordControl = component.loginForm.get('password');
    passwordControl?.setValue('');
    expect(passwordControl?.valid).toBeFalsy();
    expect(passwordControl?.errors?.['required']).toBeTruthy();
  });

  it('alternar la visibilidad de la contraseña', () => {
    expect(component.showPassword).toBeFalsy();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeTruthy();
    component.togglePasswordVisibility();
    expect(component.showPassword).toBeFalsy();
  });

  it('navegar al home cuando el login es exitoso', () => {
    jest.spyOn(authService, 'login').mockReturnValue(of(mockUserData));
    component.onSubmit();
    expect(authService.login).toHaveBeenCalledWith('usuario@ejemplo.com', 'password123');
    expect(router.navigate).toHaveBeenCalledWith(['/']);
  });

  it('no enviar el formulario cuando es inválido', () => {
    component.loginForm.get('email')?.setValue('');
    const spy = jest.spyOn(authService, 'login');
    component.onSubmit();
    expect(spy).not.toHaveBeenCalled();
  });
}); 