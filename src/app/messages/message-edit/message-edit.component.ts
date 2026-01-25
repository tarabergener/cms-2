import {
  Component,
  ElementRef,
  ViewChild,
  EventEmitter,
  Output,
} from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css',
})
export class MessageEditComponent {
  @ViewChild('subjectInput') subjectInputRef: ElementRef;
  @ViewChild('msgInput') msgInputRef: ElementRef;
  @Output() messageSent = new EventEmitter<Message>();

  onSendMessage() {
    const newMessage = new Message(
      Math.random().toString(),
      this.subjectInputRef.nativeElement.value,
      this.msgInputRef.nativeElement.value,
      'Me',
    );

    this.messageSent.emit(newMessage);
    this.onClear();
  }

  onClear() {
    this.subjectInputRef.nativeElement.value = '';
    this.msgInputRef.nativeElement.value = '';
  }
}
