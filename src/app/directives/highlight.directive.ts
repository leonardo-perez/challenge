import { Directive, ElementRef, Input, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective  {
  @Input() appHighlight: string = '';
  @Input() searchTerm: string = '';

  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchTerm'] || changes['appHighlight']) {
      this.highlight();
    }
  }

  private highlight() {
    if (!this.searchTerm || !this.appHighlight) {
      this.el.nativeElement.innerHTML = this.appHighlight;
      return;
    }

    const regex = new RegExp(this.searchTerm, 'gi');
    const text = this.appHighlight;
    const highlightedText = text.replace(regex, match => 
      `<span style="background-color: yellow">${match}</span>`
    );
    
    this.el.nativeElement.innerHTML = highlightedText;
  }
} 