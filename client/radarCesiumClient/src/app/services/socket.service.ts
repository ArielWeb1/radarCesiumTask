import {Injectable} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {Observable} from "rxjs/index";
import {Store} from '@ngrx/store';
import {RadarEntity} from "../radarPoint";
import {AppState, AppStatePlolyoine} from "../store/app.state";
import * as actionPoint from "../store/actions/points.action";
import  * as actionUpdatePoint from "../store/actions/updatePoints.action";
import {Server} from "socket.io";
import {PolylinePoint} from "../polylinePoint";

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})

export class SocketService {
  radar: Observable<RadarEntity[]>;
  newRadar: Observable<PolylinePoint[]>;//
  socket: Server;

  private callServer;

  constructor(private store: Store<AppState>, private updateStore: Store<AppStatePlolyoine>) {
    this.radar = store.select('radar');
    this.newRadar = updateStore.select('newRadar');//
    console.log(this.newRadar);
  }

  connect() {
    this.socket = socketIo(SERVER_URL);
    this.socket.on('hello', (data) => {
      this.callServer = this.store.dispatch(new actionPoint.PointsAdded(data));
    });

    this.socket.on('change', (data) => {
      this.callServer = this.updateStore.dispatch(new actionUpdatePoint.PolylinePointsAdded(data));
    });
  }
}
