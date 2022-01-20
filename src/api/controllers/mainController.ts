import { ConnectedSocket, OnConnect, SocketController, SocketIO } from "socket-controllers";
import { Socket, Server } from "socket.io";

@SocketController()
export class MainController {

    // Conectar con el servidor Sockect y detectar dispositivo
    @OnConnect()
    public onConnection(
        @ConnectedSocket() socket: Socket,
        @SocketIO() io: Server
    ) {
        console.log("Nuevos Socket Conectado", socket.id);

        socket.on("custom_event", (data: any) => {
            console.log("Data: ", data)
        });
    }


}