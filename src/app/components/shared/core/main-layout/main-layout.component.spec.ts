import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MainLayoutComponent } from './main-layout.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
describe('MainLayoutComponent', () => {
  let component: MainLayoutComponent;
  let fixture: ComponentFixture<MainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MainLayoutComponent,
        SidebarComponent,
        RouterOutlet,
        CommonModule,
        HttpClientTestingModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(MainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('crear el componente', () => {
    expect(component).toBeTruthy();
  });

  it('abrir y cerrar el menú al hacer clic', () => {
    component.toggleMenu();
    expect(component.isOpenMenu).toBe(true);
    
    component.toggleMenu();
    expect(component.isOpenMenu).toBe(false);
  });


});
