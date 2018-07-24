import {Injectable} from '@angular/core';
import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {
  // private callServer;

  socket:
    {
      on(event: string, callback: (data: any) => void);
      emit(event: string, data: any);
    };

    connect(): void {
      this.socket = socketIo(SERVER_URL);
      this.socket.on('hello', (data) => console.log(data));
    }

}
