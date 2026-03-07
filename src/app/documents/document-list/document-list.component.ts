import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
import { DocumentService } from '../document.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css',
})
export class DocumentListComponent implements OnInit {
  documents: Document[] = [];

  subscription: Subscription;

  constructor(private documentService: DocumentService) {}

  ngOnInit() {
    this.documentService.getDocuments().subscribe((documents) => {
      this.documents = documents;
    });

    this.documentService.documentChangedEvent.subscribe(
      (documents: Document[]) => {
        this.documents = documents;
      },
    );

    this.documentService.documentListChangedEvent.subscribe(
      (documentList: Document[]) => {
        this.documents = documentList;
      },
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
