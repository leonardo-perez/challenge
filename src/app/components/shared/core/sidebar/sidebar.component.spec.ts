import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidebarComponent } from './sidebar.component';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { UserData } from '../../../../models/user.model';

describe('SidebarComponent', () => {
  let component: SidebarComponent;
  let fixture: ComponentFixture<SidebarComponent>;
  let authService: AuthService;

  const mockUserData: UserData = {
    email: 'juan@example.com',
    password: 'password123',
    name: 'Juan Pérez',
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6Ikp1YW4gUGVyZXoiLCJpYXQiOjE1MTYyMzkwMjJ9.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c'
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        SidebarComponent, 
        FormsModule,
        HttpClientTestingModule
      ],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(SidebarComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('cargar los datos del usuario al iniciar el componente', () => {
    jest.spyOn(authService, 'getUserData').mockReturnValue(mockUserData);
    component.ngOnInit();
    expect(component.userData).toEqual(mockUserData);
  });

  it('invocar el método logout al hacer clic en el botón de cerrar sesión', () => {
    const spy = jest.spyOn(authService, 'logout');
    component.logout();
    expect(spy).toHaveBeenCalled();
  });
});
