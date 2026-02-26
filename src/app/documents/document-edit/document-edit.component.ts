import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css',
})
export class DocumentEditComponent {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;

  constructor() {
    // Initialize properties if needed
  }

  onSubmit(form: NgForm) {
    console.log('Form submitted:', form.value);
  }
}
