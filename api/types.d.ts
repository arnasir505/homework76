export interface ClientMessage {
  author: string;
  message: string;
}

export interface Message extends ClientMessage {
  id: string;
  datetime: string;
}