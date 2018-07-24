import {Component, OnInit} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {SocketService} from './services/socket.service';
// import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';
  stockQuote: number;
  // sub: Subscription;

  // constructor(private socketService: SocketService) { }

//   ngOnInit(): void  {
//     const socket = socketIo('http://localhost:3000');
//     socket.on('hello', (data) => console.log(data));
// }

  ngOnInit() {
    // this.sub = this.socketService.getQuotes()
    //   .subscribe(quote => {
    //     this.stockQuote = quote;
    //   });
  }

}
