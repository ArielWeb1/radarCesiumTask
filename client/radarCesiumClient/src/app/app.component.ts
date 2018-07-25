import {Component, OnInit} from '@angular/core';
import {SocketService} from './services/socket.service';
import {Message} from "@angular/compiler/src/i18n/i18n_ast";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private message;
  messages: Message[] = [];
  ioConnect: any;

  constructor(private socketService: SocketService) {
    this.message = this.socketService.connect();
    console.log(this.message);
  }

  ngOnInit() {
    // this.message = this.socketService.connect();
    // this.firstConnection();
  }

  //  firstConnection(): void {
  //       this.ioConnect = this.socketService.connect().subscribe((data: Message) => {
  //         this.messages.push(data);
  //       });
  //   console.log(this.messages);
  // }

  // ngOnInit() {
  //   this.message = this.socketService.serverConnect();
  // }

}
