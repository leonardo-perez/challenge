import { Component, DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HighlightDirective } from './highlight.directive';

@Component({
  template: `
    <div [appHighlight]="text" [searchTerm]="searchTerm"></div>
  `,
  standalone: true,
  imports: [HighlightDirective]
})
class TestComponent {
  text: string = '';
  searchTerm: string = '';
}

describe('HighlightDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;
  let divEl: DebugElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    divEl = fixture.debugElement.query(By.directive(HighlightDirective));
    fixture.detectChanges();
  });

  it('crear el componente', () => {
    expect(divEl).toBeTruthy();
  });

  it('mostrar el texto sin resaltado cuando no hay término de búsqueda', () => {
    component.text = 'Texto de prueba';
    component.searchTerm = '';
    fixture.detectChanges();
    expect(divEl.nativeElement.innerHTML).toBe('Texto de prueba');
  });

  it('resaltar el texto cuando coincide con el término de búsqueda', () => {
    component.text = 'Texto de prueba';
    component.searchTerm = 'prueba';
    fixture.detectChanges();
    expect(divEl.nativeElement.innerHTML).toContain('<span style="background-color: yellow">prueba</span>');
  });

  it('no resaltar el texto cuando no hay coincidencias', () => {
    component.text = 'Texto de prueba';
    component.searchTerm = 'xyz';
    fixture.detectChanges();
    expect(divEl.nativeElement.innerHTML).not.toContain('<span style="background-color: yellow">');
  });
}); 