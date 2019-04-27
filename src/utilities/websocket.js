export default class Websocket {
    setupSocket(callback) {
        this.socket = new WebSocket("ws://localhost:4000/ws/chat");

        this.socket.addEventListener("message", callback);

        this.socket.addEventListener("close", () => {
            this.setupSocket();
        });
    }

    submit(direction) {
        const message = "" + direction;
        this.socket.send(
            JSON.stringify({
                data: { message: message },
            })
        );
    }
}
