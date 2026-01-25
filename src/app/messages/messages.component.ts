import { Component, OnInit } from '@angular/core';
import { Message } from './message.model';

@Component({
  selector: 'cms-messages',
  standalone: false,
  templateUrl: './messages.component.html',
  styleUrl: './messages.component.css',
})
export class MessagesComponent implements OnInit {
  messages: Message[] = [
    new Message('1', 'Tom Hanks', 'It was nice to meet you.', 'Sally'),
  ];

  constructor() {}

  ngOnInit(): void {}

  onMessageSelected(message: Message) {
    this.messages.push(message);
  }
}
