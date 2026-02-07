import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css',
  providers: [ContactService],
})
export class ContactsComponent implements OnInit {
  @Output() contactWasSelected = new EventEmitter<Contact>();
  selectedContact: Contact | null = null;
  contacts: Contact[];

  constructor(private contactService: ContactService) {}

  ngOnInit() {
    this.contacts = this.contactService.getContacts();
  }

  onContactSelected(contact: Contact) {
    this.contactWasSelected.emit(contact);
  }
}
