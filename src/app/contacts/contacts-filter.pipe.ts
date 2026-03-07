import { Pipe, PipeTransform } from '@angular/core';
import { Contact } from './contact.model';

@Pipe({
  name: 'contactsFilter',
  standalone: false,
})
export class ContactsFilterPipe implements PipeTransform {
  transform(contacts: Contact[], term: string): any {
    let filteredContacts: Contact[] = [];

    if (!contacts || !term) {
      return contacts;
    }

    for (let i = 0; i < contacts.length; i++) {
      let contact = contacts[i];

      if (contact.name.toLowerCase().includes(term)) {
        filteredContacts.push(contact);
      }
    }
    if (filteredContacts.length < 1) {
      return contacts;
    }
    return filteredContacts;
  }
}
