import { Component } from '@angular/core';
import { Contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { ActivatedRoute, Params } from '@angular/router';
import { WindRefService } from '../../wind-ref.service';

@Component({
  selector: 'cms-contact-detail',
  standalone: false,
  templateUrl: './contact-detail.component.html',
  styleUrl: './contact-detail.component.css',
})
export class ContactDetailComponent {
  id: number;
  contact: Contact;
  natveWindow: any;

  constructor(
    private contactService: ContactService,
    private route: ActivatedRoute,
    private windRefService: WindRefService,
  ) {
    this.natveWindow = this.windRefService.getNativeWindow();
  }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.contact = this.contactService.getContactById(this.id);
    });
  }

  onDelete() {
    this.contactService.deleteContact(this.contact);
    this.natveWindow.history.back();
  }
}
