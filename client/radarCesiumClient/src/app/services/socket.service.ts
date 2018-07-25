import {Injectable} from '@angular/core';
import * as socketIo from 'socket.io-client';
import {Store} from '@ngrx/store';
import {RadarEntity} from "../radarPoint";
import * as actionPoint from "../store/actions/points.action";

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  // private callServer;
  // private socket: SocketIOClient.Socket;

  // constructor(private store: Store<any>){}

  socket:
    {
      on(event: string, callback: (data: any) => void);
      emit(event: string, data: any);
    };

    connect () {
      this.socket = socketIo(SERVER_URL);
      // this.store.dispatch(new actionPoint.PointsLoaded());
      return this.socket.on('hello', (data) => data
        // this.callServer =  data;
       // console.log(data);
       // return data;
     );



     // console.log(this.callServer);
     // return this.callServer;
    }

  // serverConnect () {
  //     this.socket = socketIo.connect(SERVER_URL);
  //    this.callServer= this.socket.on('hello', (data) => console.log(data));
  //    return this.callServer;

    // var socket = socketIo.connect(SERVER_URL);
    // socket.on('message', function(message) {
    //   return ('The server has a message for you: ' + message);
    // });
    // }
}
