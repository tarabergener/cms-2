import { Component, OnInit } from '@angular/core';
import { Message } from './message.model';

@Component({
  selector: 'cms-messages',
  standalone: false,
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [];

  constructor() {}

  ngOnInit(): void {}

  onMessageSelected(message: Message) {
    this.messages.push(message);
  }
}
