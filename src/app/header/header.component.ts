import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'cms-header',
  standalone: false,
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  @Output() featureSelected = new EventEmitter<string>();

  onSelect(feature: string) {
    this.featureSelected.emit(feature);
  }
}
