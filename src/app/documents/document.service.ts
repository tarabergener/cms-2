import { EventEmitter, Injectable } from '@angular/core';
import { Document } from './document.model';
import { MOCKDOCUMENTS } from './MOCKDOCUMENTS';

@Injectable({
  providedIn: 'root',
})
export class DocumentService {
  documents: Document[] = [];

  documentSelectedEvent = new EventEmitter<Document>();

  constructor() {
    this.documents = MOCKDOCUMENTS;
  }

  getDocuments(): Document[] {
    return this.documents.slice();
  }

  getDocumentById(id: number) {
    return this.documents[id];
  }

  getDocument(index: string): Document {
    this.documents.forEach((document) => {
      if (document.id === index) {
        return document;
      }
    });
    return null;
  }
}
