export default class Websocket {
  constructor() {
    this.handlers = [];
  }

  subscribe(channel) {
    this.socket = new WebSocket(`ws://localhost:4000/ws/${channel}`);

    this.socket.addEventListener("close", () => {
      this.subscribe(channel);
      this.handlers.forEach(cb => this.listen(cb));
    });

    return this;
  }

  listen(callback) {
    this.handlers.push(callback);
    this.socket.addEventListener("message", callback);
  }

  broadcast(data) {
    const message = JSON.stringify(data);
    this.socket.send(
      JSON.stringify({
        data: { message: message }
      })
    );
  }
}
