import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessagesService } from 'src/app/shared/services/messages.service'
import { AuthService } from 'src/app/shared/services/auth.service';
import { User } from 'src/app/shared/interfaces/user';
import { Router } from '@angular/router';
import { Message } from 'src/app/shared/interfaces/message'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})

export class ChatComponent implements OnInit {

  public user$: Observable<User | null> = this.authService.user$.asObservable();
  public idConv: number = 1;
  public conversations: any;
  public messages: any;
  public correspondant: any;
  public userId!: number | undefined;
/*   public messageToSend: string = ""; */

  public form: FormGroup = this.fb.group({
    messageToSend: ['', Validators.required]
  });

  constructor(private fb: FormBuilder, private ms: MessagesService, private authService:AuthService, private router:Router) { }
    
  ngOnInit(): void {
    this.user$.subscribe(id_user => this.userId = id_user?.id)
    this.getAllConversations(this.userId);
  }

  getAllConversations(user: number | undefined): void{
    this.ms.getAllConversations(this.userId).subscribe(data => {
      this.conversations = data;
      console.log(this.conversations);
      this.idConv = this.conversations[0].id;
      console.log(this.idConv);
      this.goToConversation(this.idConv);
    });
  }

  goToConversation(idConv: number): void {
    this.ms.getAConversation(idConv).subscribe(data => {
      this.messages = data; 
      console.log(this.messages);
    })
  }

  sendAMessage(): void {
    console.log(this.form.value);
    console.log(this.idConv);
    console.log(this.form.value.messageToSend);
    const newMessage: Message = {
      conversationID: this.idConv,
      sender: this.userId,
      content: this.form.value.messageToSend
    }
    this.ms.sendMessage(newMessage).subscribe(() => {
      this.goToConversation(this.idConv),
      this.form.patchValue({messageToSend: ''});    }
    );
  }

}
