import { Component, OnInit } from '@angular/core';
import {webSocket, WebSocketSubject} from 'rxjs/webSocket';
import { SocketMessage } from '../../dtos/socket-message.dto';

const URL = 'ws://192.168.4.1:81';

@Component({
  selector: 'app-live-view',
  templateUrl: './live-view.component.html',
  styleUrls: ['./live-view.component.css']
})
export class LiveViewComponent implements OnInit {

  private myWebSocket: WebSocketSubject<SocketMessage>;
  public Temperature: number = null;
  public Humadity: number = null;
  public Pressure: number = null;
  public Altitude: number = null;
  public Coordinates: string = '';

  constructor() {
  }

  ngOnInit() {
    this.myWebSocket = webSocket(`${URL}`);
    this.myWebSocket.pipe().subscribe(res => {
      this.Temperature = res.Temperature;
      this.Pressure = res.Pressure;
      this.Humadity = res.Humadity;
      this.Altitude = res.Altitude;    
      this.Coordinates=res.Coordinates;
    });
  }
}



