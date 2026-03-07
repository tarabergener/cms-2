import { Component, OnInit } from '@angular/core';
import { ContactService } from '../contact.service';
import { Contact } from '../contact.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css',
})
export class ContactListComponent implements OnInit {
  contacts: Contact[] = [];
  term: string;

  subscription: Subscription;

  constructor(private contactService: ContactService) {}

  search(value: string) {
    this.term = value.toLowerCase();
  }

  ngOnInit() {
    this.contactService.getContacts().subscribe((contacts) => {
      this.contacts = contacts;
    });

    this.contactService.contactChangedEvent.subscribe(
      (contacts: Contact[]) => {
        this.contacts = contacts;
      },
    );
    this.contactService.contactListChangedEvent.subscribe(
      (contactList: Contact[]) => {
        this.contacts = contactList;
      },
    );
  }

  ngOnDestroy() {
    // Unsubscribe from the event to prevent memory leaks
    this.subscription.unsubscribe();
  }
}
