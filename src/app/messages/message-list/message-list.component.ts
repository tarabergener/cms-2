import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css',
})
export class MessageListComponent {
  @Input() messages: Message[] = [];
  @Output() messageSelected = new EventEmitter<Message>();

  onSelect(message: Message) {
    this.messageSelected.emit(message);
  }
}
