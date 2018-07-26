import {Component, OnInit} from '@angular/core';
import {SocketService} from './services/socket.service';
import {RadarEntity} from "./radarPoint";
import {Observable} from "rxjs/index";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private message;

  constructor(private socketService: SocketService) {
    this.socketService.connect();
  }

  ngOnInit() {
    // this.message = this.socketService.loadPoints();
    // console.log(this.message);
  }
  //  firstConnection(): void {
  //       this.ioConnect = this.socketService.connect().subscribe((data: Message) => {
  //         this.messages.push(data);
  //       });
  //   console.log(this.messages);
  // }
}
