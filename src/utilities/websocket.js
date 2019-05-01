export default class Websocket {
  subscribe(channel, handler) {
    let scheme = "ws";

    if (document.location.protocol === "https:") {
      scheme += "s";
    }

    this.handler = handler;

    this.connection = new WebSocket(`${scheme}://localhost:4000/ws/${channel}`);

    this.connection.onopen = this.pollServer.bind(this);

    this.connection.onmessage = this.reciever.bind(this);

    this.connection.onclose = this.clearTimers.bind(this);

    return this;
  }

  reciever(response) {
    if (response.data === "__pong__") {
      clearTimeout(this.closeTimeoutID);
      this.closeTimeoutID = null;
      return;
    }

    return this.handler(JSON.parse(response.data));
  }

  broadcast(data) {
    const message = JSON.stringify(data);
    this.connection.send(
      JSON.stringify({
        data: { message: message }
      })
    );

    // we can suspend pinging the server whilst websocket is alive
    this.clearTimers();

    if (!this.pollTimeoutID) {
      this.pollTimeoutID = setTimeout(this.pollServer.bind(this), 5000);
    }
  }

  pollServer() {
    // Begin healthcheck polling
    this.intervalID = setInterval(this.ping.bind(this), 30000);
  }

  ping() {
    this.connection.send("__ping__");
    // No pong after 5 seconds close the connection
    this.closeTimeoutID = setTimeout(() => this.connection.close(), 5000);
  }

  clearTimers() {
    clearInterval(this.intervalID);
    this.intervalID = null;
    clearTimeout(this.pollTimeoutID);
    this.pollTimeoutID = null;
  }
}
