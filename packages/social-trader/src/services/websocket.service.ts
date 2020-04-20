import { useEffect, useState } from "react";
import { interval, Observable, Subject } from "rxjs";
import { map, takeWhile } from "rxjs/operators";
import { WebSocketSubject } from "rxjs/webSocket";

interface SocketInterface {
  reconnectInterval: number;
  reconnectAttempts: number;
  url: string;
  reconnect(url: string): void;
  disconnect(): void;
  subscribe(): Subject<any>;
}

export type ConnectSocketMethodType = (
  type: string,
  url: string
) => Observable<any>;

const useSockets = () => {
  const [sockets, setSockets] = useState<{ [key: string]: SocketInterface }>(
    {}
  );
  const connectSocket = (type: string, url: string): Observable<any> => {
    if (sockets[type]) {
      if (sockets[type].url !== url) sockets[type].reconnect(url);
      return sockets[type].subscribe();
    } else {
      const socket = new Socket(url);
      setSockets({ ...sockets, [type]: new Socket(url) });
      sockets[type] = socket;
      return socket.subscribe();
    }
  };
  useEffect(() => {
    return () => {
      Object.values(sockets).forEach((socket: SocketInterface) =>
        socket.disconnect()
      );
    };
  }, []);
  return { connectSocket };
};

class Socket implements SocketInterface {
  private websocket?: WebSocketSubject<any>;
  private wsMessages?: Subject<any>;
  readonly reconnectInterval = 5000;
  readonly reconnectAttempts = 10;
  public url: string;

  constructor(url: string) {
    this.url = url;
    this.connect(url);
  }

  private connect = (url: string) => {
    this.websocket = new WebSocketSubject(url);
    this.wsMessages = new Subject<any>();
    this.websocket.subscribe(
      message => this.wsMessages && this.wsMessages.next(message),
      error => {
        if (!this.websocket) {
          console.log("Disconnect", error);
          return interval(this.reconnectInterval).pipe(
            takeWhile(
              (v, index) => index < this.reconnectAttempts && !this.websocket
            ),
            map(() => this.connect(url))
          );
        }
      }
    );
  };

  public disconnect = () => {
    this.websocket && this.websocket.complete();
    this.wsMessages && this.wsMessages.complete();
  };

  public reconnect = (url: string) => {
    this.disconnect();
    this.connect(url);
  };

  public subscribe = () => this.wsMessages!;
}
