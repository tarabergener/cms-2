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
    return this.http.get<Message[]>('http://localhost:3000/messages');
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
    this.http.get<Message[]>('http://localhost:3000/messages').subscribe(
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
    if (!message) {
      return;
    }

    // make sure id of the new Message is empty
    message.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // add to database
    this.http
      .post<{
        note: string;
        message: Message;
      }>('http://localhost:3000/messages', message, { headers: headers })
      .subscribe((responseData) => {
        // add new message to messages
        this.messages.push(responseData.message);
        this.sortAndSend();
      });
  }

  updateMessage(originalMessage: Message, newMessage: Message) {
    if (!originalMessage || !newMessage) {
      return;
    }

    const pos = this.messages.findIndex((d) => d.id === originalMessage.id);

    if (pos < 0) {
      return;
    }

    // set the id of the new Message to the id of the old Message
    newMessage.id = originalMessage.id;
    // newMessage._id = originalMessage._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // update database
    this.http
      .put('http://localhost:3000/messages/' + originalMessage.id, newMessage, {
        headers: headers,
      })
      .subscribe((response: Response) => {
        this.messages[pos] = newMessage;
        this.sortAndSend();
      });
  }

  deleteMessage(message: Message) {
    if (!message) {
      return;
    }

    const pos = this.messages.findIndex((d) => d.id === message.id);

    if (pos < 0) {
      return;
    }

    // delete from database
    this.http
      .delete('http://localhost:3000/messages/' + message.id)
      .subscribe((response: Response) => {
        this.messages.splice(pos, 1);
        this.sortAndSend();
      });
  }
  sortAndSend() {
    this.messages.sort((a, b) => {
      if (a.subject < b.subject) {
        return -1;
      }
      if (a.subject > b.subject) {
        return 1;
      }
      return 0;
    });
    // this.messageListChangedEvent.next(this.messages.slice());
  }
}
