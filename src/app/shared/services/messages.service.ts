import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from '../../../environments/environment';
import { Message } from '../interfaces/message'
import { User } from '../interfaces/user';


@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private url = environment.apiURL;

  constructor(private http:HttpClient) { }

  public getAConversation(id: number): Observable<any> {
    return this.http.get(`${this.url}/messages/conv/${id}`);
  }

  public getAllConversations(user: number | undefined): Observable<any> {
    return this.http.get(`${this.url}/conversation/allConv/${user}`);
  }

  public sendMessage(message: Message) {
    return this.http.post(`${this.url}/messages/send`, message);

  }
}
