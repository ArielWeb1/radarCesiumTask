import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Observer} from 'rxjs';
import * as socketIo from 'socket.io-client';

const SERVER_URL = 'http://localhost:3000';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  socket:
    {
      on(event: string, callback: (data: any) => void);
      emit(event: string, data: any);
    };
  observer: Observer<number>;

  getQuotes(): Observable<number> {
    this.socket = socketIo(SERVER_URL);

    this.socket.on('data', (res) => {
      this.observer.next(res.data);
    });

    return this.createObservable();
  }

  createObservable(): Observable<number> {
    return new Observable<number>(observer => {
      this.observer = observer;
    });
  }
  // constructor() { }
}
