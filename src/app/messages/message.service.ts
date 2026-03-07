import { EventEmitter, Injectable, Input } from '@angular/core';
import { Message } from './message.model';
import { MOCKMESSAGES } from './MOCKMESSAGES';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  messageChangedEvent = new EventEmitter<Message[]>();
  messages: Message[] = [];
  maxMessageId: number;

  constructor(private http: HttpClient) {
    this.messages = MOCKMESSAGES;
  }

  getMessages() {
    return this.http.get<Message[]>(
      'https://tdbcms-b25b3-default-rtdb.firebaseio.com/messages.json',
    );
  }

  getMessage(id: string): Message {
    this.messages.forEach((message) => {
      if (message.id === id) {
        return message;
      }
    });
    return null;
  }

  getMessagesFromServer() {
    this.http
      .get<
        Message[]
      >('https://tdbcms-b25b3-default-rtdb.firebaseio.com/messages.json')
      .subscribe(
        (messages: Message[]) => {
          this.messages = messages;
          this.maxMessageId = this.getMaxId();
          this.messages.sort((a, b) => {
            if (a.sender < b.sender) {
              return -1;
            }
            if (a.sender > b.sender) {
              return 1;
            }
            return 0;
          });
        },
        (error: any) => {
          console.log(error);
        },
      );
  }

  getMaxId(): number {
    let maxId = 0;

    this.messages.forEach((message) => {
      const currentId = parseInt(message.id, 10);
      if (currentId > maxId) {
        maxId = currentId;
      }
    });

    return maxId;
  }

  storeMessages() {
    const messages = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    this.http
      .put(
        'https://tdbcms-b25b3-default-rtdb.firebaseio.com/messages.json',
        messages,
        { headers: headers },
      )
      .subscribe(() => {
        console.log(messages);
      });
  }

  addMessage(message: Message) {
    this.messages.push(message);
    this.messageChangedEvent.emit(this.messages.slice());
    this.storeMessages();
  }
}
