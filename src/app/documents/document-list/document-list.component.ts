import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [
    new Document('1', 'Taxes', 'Tax documents for 2014', 'www.gmail.com'),
  ];

  constructor() {}

  ngOnInit(): void {}

  onDocumentSelected(document: Document) {
    this.documents.push(document);
  }
}
