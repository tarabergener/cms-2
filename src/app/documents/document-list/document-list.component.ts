import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [
    new Document(
      '1',
      '2014 Taxes',
      'All tax documents for 2014',
      'taxes2014.pdf',
    ),
    new Document(
      '2',
      'Medical Records',
      '2024 medical records',
      'medical2024.pdf',
    ),
    new Document(
      '3',
      'Personal Identification',
      'New drivers license scan',
      'license.pdf',
    ),
    new Document(
      '4',
      '2025 Expenses',
      'Expense chart from 2025',
      'expense.pdf',
    ),
  ];

  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  constructor() {}

  ngOnInit(): void {}

  onSelectedDocument(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }
}
