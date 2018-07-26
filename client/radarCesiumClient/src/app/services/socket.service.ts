import {Injectable} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {Observable} from "rxjs/index";
import {Store} from '@ngrx/store';
import {RadarEntity} from "../radarPoint";
import {AppState} from "../store/app.state";
import * as actionPoint from "../store/actions/points.action";
import {Server} from "socket.io";

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  radar: Observable<RadarEntity[]>;
  socket:Server;

  private callServer;

  constructor(private store: Store<AppState>) {
    this.radar = store.select('radar');
  }

  connect() {
    this.socket = socketIo(SERVER_URL);
    this.socket.on('hello', (data) => {
      this.callServer = this.store.dispatch(new actionPoint.PointsAdded(data));
      // console.log(this.callServer);
      // return data;
    });
  }

  // loadPoints() {
  //   // this.store.select('RadarReducer').subscribe((data: AppState) => this.state = data )
  //   this.radar = this.store.select('radar');
  //   return this.radar;
  // }

}
