import { Component, OnInit } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrl: './contact-edit.component.css',
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
      if (!this.id) {
        this.editMode = false;
        return;
      }
      this.originalContact = this.contactService.getContact(this.id);
      if (!this.originalContact) {
        return;
      }
      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));
      if (this.originalContact.group) {
        this.groupContacts = JSON.parse(
          JSON.stringify(this.originalContact.group),
        );
      }
    });
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new Contact(
      '',
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
    );
    if (this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }
    this.router.navigate(['/contacts']);
  }

  onCancel() {
    window.location.href = '/contacts';
  }
}
