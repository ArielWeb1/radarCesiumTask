import {Component, OnInit} from '@angular/core';
import {SocketService} from './services/socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private callServer;

  constructor(private socketService: SocketService) { }

  ngOnInit() {
    this.callServer = this.socketService.connect();
  }

}
