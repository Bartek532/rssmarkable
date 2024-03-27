import type { WebSocketMessage, SerializedMessage } from "./types";

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export default class MessageInterpreter {
  private constructor() {}

  static send(message: WebSocketMessage): SerializedMessage {
    return JSON.stringify(message);
  }
  static receive(serializedMessage: SerializedMessage): WebSocketMessage {
    return JSON.parse(serializedMessage) as WebSocketMessage;
  }
}
