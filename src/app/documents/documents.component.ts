import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cms-documents',
  standalone: false,
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.css',
})
export class DocumentsComponent {
  selectedDocument: Document | null = null;

  constructor() {}
}
